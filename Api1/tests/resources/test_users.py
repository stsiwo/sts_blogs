from .import printObject, decodeResponseByteJsonToDictionary
from Infrastructure.DataModels.UserModel import User


# PUT /users/{id} functional testing
# u01. unauthorized access test
# u02. invalid input test
# u03. target user does not exists test
# u04. status code test when successfully updated
# u05. response data test when successfully updated
# u06. admin user access test (admin can update all other user's data)
# NOTE: image uploading has dedicated endpoint so not include image here

def test_u01_users_put_endpoint_should_return_401_code_since_unauthorized_access(client, database, application, httpHeaders):

    response = client.put('/users/1')
    assert 401 == response.status_code


def test_u02_users_put_endpoint_should_allow_authed_user_to_get_400_code_since_input_is_invalid(authedClient, database, application, httpHeaders):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/users/{}'.format(12342),
            json={
                'name': 'updated_name',
                # 'email': 'updated@test.com',
                'password': 'updated_password'
                },
            headers=httpHeaders
            )

    assert 400 == response.status_code


def test_u03_users_put_endpoint_should_allow_authed_user_to_get_404_code_since_target_user_does_not_exist(authedClient, database, application, httpHeaders):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/users/{}'.format(12342),
            json={
                'name': 'updated_name',
                'email': 'updated@test.com',
                'password': 'updated_password'
                },
            headers=httpHeaders
            )

    assert 404 == response.status_code


def test_u04_users_put_endpoint_should_allow_authed_user_to_get_200_code_without_avatar_image_file(authedClient, database, application, httpHeaders):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter(User.email == 'test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/users/{}'.format(userId),
            json={
                'name': 'updated_name',
                'email': 'updated@test.com',
                'password': 'updated_password'
                },
            headers=httpHeaders
            )

    assert 200 == response.status_code


def test_u05_users_put_endpoint_should_allow_authed_user_to_return_updated_user(authedClientWithUserSeeded, database, application, httpHeaders):

    userId = None

    with application.app_context():
        user = database.session.query(User).join(User.user).filter(User.email == 'test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClientWithUserSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithUserSeeded.put(
            '/users/{}'.format(userId),
            json={
                'title': 'updated_title',
                'content': 'updated_content'
                },
            headers=httpHeaders
            )

    printObject(response)

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['title']
    assert 'updated_content' == data['content']
