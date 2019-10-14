from flask import Response
import json
import utils
from Infrastructure.DataModels.UserModel import User


def test_login_endpoint_no_json_data_should_response_with_400(client):

    rv = client.post('/login')
    assert 400 == rv.status_code


def test_login_endpoint_no_json_data_should_response_with_400_with_error_msg(client):

    rv: Response = client.post('/login')
    data = json.loads(rv.get_data())
    assert 'message' in data


def test_login_endpoint_no_json_data_should_response_with_400_with_bundle_error_msg(client):

    rv: Response = client.post('/login')
    data = json.loads(rv.get_data())
    assert len(data['message']) > 1


def test_user_logined_successfully(client, testUserWithMemberRoleFixture):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    rv = client.post('/login', 'http://localhost', json={
        'email': 'test@test.com',
        'password': 'password'
        }, headers=headers)

    assert 200 == rv.status_code


def test_user_logined_successfully_and_get_jwt_tokens(
        client,
        database,
        application,
        testUserWithMemberRoleFixture):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    rv = client.post('/login', 'http://localhost', json={
        'email': 'test@test.com',
        'password': 'password'
        }, headers=headers)

    cookies = [cookie[1] for cookie in rv.headers if (cookie[0] == 'Set-Cookie')]
    assert 200 == rv.status_code
    assert any('access_token' in s for s in cookies) is True
    assert any('refresh_token' in s for s in cookies) is True
    assert any('csrf_access_token' in s for s in cookies) is True
    assert any('csrf_refresh_token' in s for s in cookies) is True


def test_user_logined_failed_since_not_found_and_receive_404(
        client,
        database,
        application,
        testUserWithMemberRoleFixture):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    rv = client.post('/login', 'http://localhost', json={
        'email': 'not-test@test.com',
        'password': 'password'
        }, headers=headers)

    assert 404 == rv.status_code
