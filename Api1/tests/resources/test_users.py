from utils.util import printObject, decodeResponseByteJsonToDictionary
from Infrastructure.DataModels.UserModel import User
import pytest
import os


# PUT /users/{id} functional testing
# u01. unauthorized access test
# u02. invalid input test
# u03. target user does not exists test
# u04. status code test when successfully updated
# u05. response data test when successfully updated
# u06. admin user access test (admin can update all other user's data)
# NOTE: image uploading has dedicated endpoint so not include image here


@pytest.mark.user_src
@pytest.mark.user_src_put
def test_u01_users_put_endpoint_should_return_401_code_since_unauthorized_access(client, database, application, multipartHttpHeaders):

    response = client.put('/users/1')
    assert 401 == response.status_code


@pytest.mark.user_src
@pytest.mark.user_src_put
def test_u02_users_put_endpoint_should_allow_authed_user_to_get_400_code_since_input_is_invalid(authedClient, database, application, multipartHttpHeaders):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/users/{}'.format(12342),
            data={
                'name': 'updated_name',
                # 'email': 'updated@test.com',
                'password': 'updated_password'
                },
            headers=multipartHttpHeaders
            )

    assert 400 == response.status_code


@pytest.mark.user_src
@pytest.mark.user_src_put
def test_u03_users_put_endpoint_should_allow_authed_user_to_get_404_code_since_target_user_does_not_exist(authedClient, database, application, multipartHttpHeaders, testUserDataForUpdate):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/users/{}'.format(12342),
            data=testUserDataForUpdate,
            headers=multipartHttpHeaders
            )

    assert 404 == response.status_code


@pytest.mark.user_src
@pytest.mark.user_src_put
def test_u04_users_put_endpoint_should_allow_authed_user_to_get_200_code_without_avatar_image_file(authedClient, database, application, multipartHttpHeaders, testUserDataForUpdate):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter(User.email == 'test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/users/{}'.format(userId),
            data=testUserDataForUpdate,
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code


@pytest.mark.user_src
@pytest.mark.user_src_put
def test_u05_users_put_endpoint_should_allow_authed_user_to_return_updated_user(authedClient, database, application, multipartHttpHeaders, testUserDataForUpdate):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter(User.email == 'test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/users/{}'.format(userId),
            data=testUserDataForUpdate,
            headers=multipartHttpHeaders
            )

    printObject(response)

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert testUserDataForUpdate['name'] == data['name']
    assert testUserDataForUpdate['email'] == data['email']


@pytest.mark.user_src
@pytest.mark.user_src_put
def test_u06_users_put_endpoint_should_allow_authed_user_to_return_updated_user_with_image(authedClient, database, application, multipartHttpHeaders, testUserDataWithImageForUpdate, testFileStorage, setupTempUploadDirWithImageFile):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter(User.email == 'test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/users/{}'.format(userId),
            data=testUserDataWithImageForUpdate,
            headers=multipartHttpHeaders
            )

    printObject(response)

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert testUserDataWithImageForUpdate['name'] == data['name']
    assert testUserDataWithImageForUpdate['email'] == data['email']
    assert os.path.join(application.config["PUBLIC_FILE_FOLDER"], str(userId), testFileStorage.filename) == data['avatarUrl']
