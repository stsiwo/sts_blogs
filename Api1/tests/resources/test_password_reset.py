from Infrastructure.DataModels.UserModel import User
from utils.util import decodeResponseByteJsonToDictionary
from utils.forgotPasswordToken import generateForgotPasswordToken, decodeForgotPasswordToken
from utils.util import printObject

# POST /user/password-reset (request for forgot password)
# pr_post01: 400 code for invalid input (missing token)
# pr_post02: 400 code for invalid input (missing new password)
# pr_post03: 400 code for token was invalid (wront token)
# pr_post04: 400 code for token already expired
# pr_post05: 204 code for successfully update password
# pr_post06: new password is persisted in db when successful


def test_pr_post01_password_reset_post_endpoint_should_return_400_code_for_missing_token_string_query(client):

    response = client.post(
            '/password-reset'
            )
    assert response.status_code == 400


def test_pr_post02_password_reset_post_endpoint_should_return_400_code_for_missing_new_password(client, httpHeaders):

    response = client.post(
            '/password-reset?token=test-token',
            json={
                },
            headers=httpHeaders)
    assert response.status_code == 400


def test_pr_post03_password_reset_post_endpoint_should_return_400_code_since_token_is_invalid(client, httpHeaders):

    response = client.post(
            '/password-reset?token=wrong-token',
            json={
                'password': 'new-test-password'
                },
            headers=httpHeaders)

    data = decodeResponseByteJsonToDictionary(response.data)

    assert response.status_code == 400
    assert data['title'] == 'bad signature'


def test_pr_post04_password_reset_post_endpoint_should_return_400_code_since_token_is_expired(client, httpHeaders, expiredTokenGenerator, usersSeededFixture):

    token = expiredTokenGenerator(2)

    response = client.post(
            '/password-reset?token={}'.format(token),
            json={
                'password': 'new-test-password'
                },
            headers=httpHeaders)

    data = decodeResponseByteJsonToDictionary(response.data)

    printObject(data)

    assert response.status_code == 400
    assert data['title'] == 'signature expired'


def test_pr_post05_password_reset_post_endpoint_should_return_204_code_for_successfully_update_password(client, httpHeaders, usersSeededFixture):

    token = generateForgotPasswordToken(2)

    response = client.post(
            '/password-reset?token={}'.format(token),
            json={
                'password': 'new-test-password'
                },
            headers=httpHeaders)

    assert response.status_code == 204


def test_pr_post06_password_reset_post_endpoint_should_update_password_in_db_when_sucessfully_updated(client, httpHeaders, usersSeededFixture, exSession):

    token = generateForgotPasswordToken(2)

    response = client.post(
            '/password-reset?token={}'.format(token),
            json={
                'password': 'new-test-password'
                },
            headers=httpHeaders)

    updatedUser = exSession.query(User).get(2)

    assert updatedUser.verifyPassword('new-test-password')
