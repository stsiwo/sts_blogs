from flask import Response
import json
import utils
from Infrastructure.DataModels.UserModel import User
from flask_jwt_extended import decode_token


def test_s01_signup_endpoint_no_json_data_should_response_with_400(client):

    rv = client.post('/signup')
    assert 400 == rv.status_code


def test_s02_signup_endpoint_no_json_data_should_response_with_400_with_error_msg(client):

    rv: Response = client.post('/signup')
    data = json.loads(rv.get_data())
    assert 'message' in data


def test_s03_signup_endpoint_no_json_data_should_response_with_400_with_bundle_error_msg(client):

    rv: Response = client.post('/signup')
    data = json.loads(rv.get_data())
    assert len(data['message']) > 1


def test_s04_new_user_created_successfully(client, rolesSeededFixture):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    rv = client.post('/signup', 'http://localhost', json={
        'name': 'test',
        'email': 'test@test.com',
        'password': 'password'
        }, headers=headers)

    assert 200 == rv.status_code


def test_s05_new_user_created_successfully_and_user_is_persisted(client, database, application, rolesSeededFixture):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    rv = client.post('/signup', 'http://localhost', json={
        'name': 'test1',
        'email': 'test1@test.com',
        'password': 'password'
        }, headers=headers)

    with application.app_context():
        queriedUser = database.session.query(User).filter_by(name='test1').first()

    assert 200 == rv.status_code
    assert queriedUser is not None


def test_s06_new_user_created_successfully_and_get_jwt_tokens(client, database, application, rolesSeededFixture):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    rv = client.post('/signup', 'http://localhost', json={
        'name': 'test1',
        'email': 'test1@test.com',
        'password': 'password'
        }, headers=headers)

    cookies = [cookie[1] for cookie in rv.headers if (cookie[0] == 'Set-Cookie')]
    assert 200 == rv.status_code
    assert any('access_token' in s for s in cookies) is True
    assert any('refresh_token' in s for s in cookies) is True
    assert any('csrf_access_token' in s for s in cookies) is True
    assert any('csrf_refresh_token' in s for s in cookies) is True


def test_s07_user_signuped_successfully_and_token_include_role_claim(
        client,
        database,
        application,
        rolesSeededFixture):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    rv = client.post('/signup', 'http://localhost', json={
        'name': 'test1',
        'email': 'test@test.com',
        'password': 'password'
        }, headers=headers)

    access_token = [cookie[1].replace(";", "=").split("=")[1] for cookie in rv.headers if (cookie[0] == 'Set-Cookie' and 'access_token' in cookie[1])]
    user_claims = None
    with application.app_context():
        utils.prettyPrint(decode_token(access_token[0]))
        user_claims = decode_token(access_token[0])['user_claims']

    assert 200 == rv.status_code
    assert user_claims.get('id') is not None
    assert user_claims.get('name') is not None
    assert user_claims.get('roles') is not None
    assert 0
