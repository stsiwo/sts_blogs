from flask import Response
import json
# from Configs.extensions import db
from Infrastructure.DataModels.UserModel import User


def test_signup_endpoint_no_json_data_should_response_with_400(client):

    rv = client.post('/signup')
    assert 400 == rv.status_code


def test_signup_endpoint_no_json_data_should_response_with_400_with_error_msg(client):

    rv: Response = client.post('/signup')
    data = json.loads(rv.get_data())
    assert 'message' in data


def test_signup_endpoint_no_json_data_should_response_with_400_with_bundle_error_msg(client):

    rv: Response = client.post('/signup')
    data = json.loads(rv.get_data())
    assert len(data['message']) > 1


def test_new_user_created_successfully(client):

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

    assert 201 == rv.status_code


def test_new_user_created_successfully_and_user_is_persisted(client, database, application):

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

    assert 201 == rv.status_code
    assert queriedUser is not None
