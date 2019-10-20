import utils
from Configs.app import app


# POST /uploads/ creating image functional testing
# ui01. unauthorized access test
# ui02. invalid input test (no file is provided)
# ui03. invalid file type test (only accept image file e.g., png, jpg)
# ui04. wrong type file type error response message test (only accept image file e.g., png, jpg)
# ui05. status code test when successfully created
# ui06. response message includes image path as response message when successfully create
# ui05. admin upload access test (admin can update all other upload's data)

# PUT /uploads/{file_name} updating image functional testing

uploads_url = app.config['UPLOAD_ENDPOINT']


def test_ui01_upload_image_post_endpoint_should_return_401_code_since_unauthorized_access(client, database, application, httpHeaders):

    response = client.post(uploads_url)
    assert 401 == response.status_code


def test_ui02_upload_image_post_endpoint_should_allow_authed_user_to_get_400_code_since_input_is_invalid(authedClient, database, application, multipartHttpHeaders):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                },
            headers=multipartHttpHeaders
            )

    assert 400 == response.status_code


def test_ui03_upload_image_post_endpoint_should_return_400_code_since_input_is_wrong_type(authedClient, database, application, multipartHttpHeaders, testNoImageFile):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatorFile': testNoImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 400 == response.status_code


def test_ui04_upload_image_post_endpoint_should_return_error_msg_since_input_is_wrong_type(authedClient, database, application, multipartHttpHeaders, testNoImageFile):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatorFile': testNoImageFile
                },
            headers=multipartHttpHeaders
            )

    data = utils.decodeResponseByteJsonToDictionary(response.data)

    assert data['msg'] is not None


def test_ui05_upload_image_post_endpoint_should_allow_authed_upload_to_get_200_code(authedClient, database, application, multipartHttpHeaders, testImageFile):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatorFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code


def test_ui06_uploads_post_endpoint_should_allow_authed_user_to_get_image_path_url_when_200_code(authedClient, database, application, multipartHttpHeaders, testImageFile):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            uploads_url,
            data={
                'avatorFile': testImageFile
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code

    data = utils.decodeResponseByteJsonToDictionary(response.data)

    assert data['imageUrl'] is not False 
