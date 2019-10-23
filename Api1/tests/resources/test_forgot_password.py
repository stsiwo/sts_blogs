from utils.util import printObject
from exceptions.EmailServiceException import EmailServiceException
import pytest
from Infrastructure.DataModels.UserModel import User

# POST /user/forgot-password (request for forgot password)
# fp_post01: 400 code for invalid input
# fp_post02: 404 code for no email address is registerd in db
# fp_post03: 500 code for internal email service exception
# fp_post04: 202 code for successfully sending email with password-reset link


def test_fp_post01_forgot_password_post_endpoint_should_return_400_code_for_invalid_input(client):

    response = client.post(
            '/forgot-password'
            )
    assert response.status_code == 400


def test_fp_post02_forgot_password_post_endpoint_should_return_404_code_since_no_such_an_email_address_in_db(client, httpHeaders):

    response = client.post(
            '/forgot-password',
            json={
                'email': 'no-exist@email.com'
                },
            headers=httpHeaders)
    assert response.status_code == 404


def test_fp_post03_forgot_password_post_endpoint_should_return_500_code_since_internal_email_service_exception_is_thrown(client, httpHeaders, patchedYgmailSendFuncWithThrowException, usersSeededFixture, exSession):

    userEmail = exSession.query(User).get(2).email

    response = client.post(
            '/forgot-password',
            json={
                'email': userEmail
                },
            headers=httpHeaders)

    assert response.status_code == 500
    patchedYgmailSendFuncWithThrowException.assert_called


def test_fp_post04_forgot_password_post_endpoint_should_return_202_code_for_successfully_email_was_sent(client, httpHeaders, patchedYgmailSendFunc, usersSeededFixture, exSession):

    userEmail = exSession.query(User).get(2).email

    response = client.post(
            '/forgot-password',
            json={
                'email': userEmail
                },
            headers=httpHeaders)

    assert response.status_code == 202
    assert patchedYgmailSendFunc.assert_called
