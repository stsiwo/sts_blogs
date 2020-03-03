from utils.util import printObject
from exceptions.EmailServiceException import EmailServiceException
import pytest
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import mail

# POST /user-email-check (request for checking provided email exists or not)
# uec_post01: 400 code for invalid input
# uec_post02: 404 code for no email address is registerd in db
# uec_post03: 204 code for provided email exists 


@pytest.mark.user_email_check_src
@pytest.mark.user_email_check_src_post
def test_uec_post01_user_email_check_post_endpoint_should_return_400_code_for_invalid_input(client):

    response = client.post(
            '/user-email-check'
            )
    assert response.status_code == 400


@pytest.mark.user_email_check_src
@pytest.mark.user_email_check_src_post
def test_uec_post02_user_email_check_post_endpoint_should_return_404_code_since_no_such_an_email_address_in_db(client, httpHeaders):

    response = client.post(
            '/user-email-check',
            json={
                'email': 'no-exist@email.com'
                },
            headers=httpHeaders)
    assert response.status_code == 404


@pytest.mark.user_email_check_src
@pytest.mark.user_email_check_src_post
def test_uec_post04_user_email_check_post_endpoint_should_return_202_code_for_provided_email_exists(client, httpHeaders, usersSeededFixture, exSession):

    userEmail = usersSeededFixture.email

    response = client.post(
            '/user-email-check',
            json={
                'email': userEmail
                },
            headers=httpHeaders)

    assert response.status_code == 204
