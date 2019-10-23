from utils.util import decodeResponseByteJsonToDictionary
from Configs.app import app
from pathlib import Path
import os
import pytest
from Infrastructure.DataModels.UserModel import User


# POST /uploads/ creating image functional testing
# ui_post01. unauthorized access test
# ui_post02. invalid input test (no file is provided)
# ui_post03. invalid file type test (only accept image file e.g., png, jpg)
# ui_post04. wrong type file type error response message test (only accept image file e.g., png, jpg)
# ui_post05. status code test when successfully created
# ui_post06. response message includes image path as response message when successfully create
# ui_post07. uploaded image url is saved to db when successfully created
# ui_post08. admin upload access test (admin can update all other upload's data)
# NOTE: different endpoint
# ui_get09. access to uploaded image at /images/{file_name} endpoint

# PUT /uploads/{file_name} updating image functional testing
# ui_put01. unauthorized access test
# ui_put02. invalid input test (no file is provided)
# ui_put03. invalid file type test (only accept image file e.g., png, jpg)
# ui_put04. wrong type file type error response message test (only accept image file e.g., png, jpg)
# ui_put05. status code test when successfully updated
# ui_put06. response message includes image path as response message when successfully updated
# ui_put07. uploaded image url is saved to db when successfully created
# ui_put08. admin upload access test (admin can update all other upload's data)

uploads_url = app.config['UPLOAD_ENDPOINT']


def test_ui_post01_upload_image_post_endpoint_should_return_401_code_since_unauthorized_access(client):

    response = client.post(uploads_url)
    assert 401 == response.status_code


def test_ui_post02_upload_image_post_endpoint_should_allow_authed_user_to_get_400_code_since_input_is_invalid(authedClient, multipartHttpHeaders):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                },
            headers=multipartHttpHeaders
            )

    assert 400 == response.status_code


def test_ui_post03_upload_image_post_endpoint_should_return_400_code_since_input_is_wrong_type(authedClient, multipartHttpHeaders, testNoImageFile):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatarFile': testNoImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 400 == response.status_code


def test_ui_post04_upload_image_post_endpoint_should_return_error_msg_since_input_is_wrong_type(authedClient, multipartHttpHeaders, testNoImageFile, setupTempUploadDir):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatarFile': testNoImageFile
                },
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data['msg'] is not None


def test_ui_post05_upload_image_post_endpoint_should_allow_authed_upload_to_get_200_code(authedClient, multipartHttpHeaders, testImageFile, setupTempUploadDir):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatarFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code


def test_ui_post06_uploads_post_endpoint_should_allow_authed_user_to_get_image_path_url_when_200_code(authedClient, multipartHttpHeaders, testImageFile, setupTempUploadDir):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatarFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data['imageUrl'] is not False


def test_ui_post07_uploads_post_endpoint_should_save_uploaded_image_url_to_db_when_200_code(authedClient, multipartHttpHeaders, testImageFile, setupTempUploadDir, exSession):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatarFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    authedUser = exSession.query(User).filter_by(email='test@test.com').first()
    assert data['imageUrl'] == authedUser.avatarUrl


def test_ui_post08_uploads_post_endpoint_should_allow_admin_user_to_get_image_path_url_when_200_code(authedAdminClient, multipartHttpHeaders, testImageFile, setupTempUploadDir):

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedAdminClient.post(
            uploads_url,
            data={
                'avatarFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data['imageUrl'] is not False


def test_ui_get08_uploaded_image_get_endpoint_should_allow_authed_user_access_uploaded_image(authedClient, multipartHttpHeaders, testImageFile, setupTempUploadDir):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatarFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert Path(os.path.join(app.config['UPLOAD_FOLDER'], testImageFile.name)).is_file()

    data = decodeResponseByteJsonToDictionary(response.data)

    headers = {
            'X-CSRF-TOKEN': csrf_token
            }

    uploadedImagePath = data['imageUrl']
    print(uploadedImagePath)

    response = authedClient.get(
            uploadedImagePath,
            headers=headers
            )

    # assert decode image throw exception
    # this makes sure response data is image not error message (decodable)
    with pytest.raises(Exception):
        response.data.decode('utf-8')


def test_ui_put01_upload_image_put_endpoint_should_return_401_code_since_unauthorized_access(client):

    response = client.put(uploads_url)
    assert 401 == response.status_code


def test_ui_put02_upload_image_put_endpoint_should_allow_authed_user_to_get_400_code_since_input_is_invalid(authedClient, multipartHttpHeaders):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            uploads_url,
            data={
                },
            headers=multipartHttpHeaders
            )

    assert 400 == response.status_code


def test_ui_put03_upload_image_put_endpoint_should_return_400_code_since_input_is_wrong_type(authedClient, multipartHttpHeaders, testNoImageFile):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            uploads_url + '/existing_test.png',
            data={
                'avatarFile': testNoImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 400 == response.status_code


def test_ui_put04_upload_image_put_endpoint_should_return_error_msg_since_input_is_wrong_type(authedClient, multipartHttpHeaders, testNoImageFile):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            uploads_url + '/existing_test.png',
            data={
                'avatarFile': testNoImageFile
                },
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data['msg'] is not None


def test_ui_put05_upload_image_put_endpoint_should_allow_authed_upload_to_get_200_code(authedClient, multipartHttpHeaders, testImageFile, setupTempUploadDirWithTestImageFile):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            uploads_url + '/existing_test.png',
            data={
                'avatarFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code


def test_ui_put06_uploads_put_endpoint_should_allow_authed_user_to_get_image_path_url_when_200_code(authedClient, multipartHttpHeaders, testImageFile, setupTempUploadDirWithTestImageFile):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            uploads_url + '/existing_test.png',
            data={
                'avatarFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data['imageUrl'] is not False


def test_ui_put07_uploads_put_endpoint_should_save_uploaded_image_url_to_db_when_200_code(authedClient, multipartHttpHeaders, testImageFile, setupTempUploadDirWithTestImageFile, exSession):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            uploads_url + '/existing_test.png',
            data={
                'avatarFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    authedUser = exSession.query(User).filter_by(email='test@test.com').first()
    assert data['imageUrl'] == authedUser.avatarUrl


def test_ui_put08_uploads_put_endpoint_should_allow_admin_user_to_get_image_path_url_when_200_code(authedAdminClient, multipartHttpHeaders, testImageFile, setupTempUploadDirWithTestImageFile):

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedAdminClient.put(
            uploads_url + '/existing_test.png',
            data={
                'avatarFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data['imageUrl'] is not False
