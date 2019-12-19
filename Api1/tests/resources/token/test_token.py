import pytest
from Infrastructure.DataModels.UserModel import User
from utils.util import printObject, decodeResponseByteJsonToDictionary, mapCookieInHeaderToDictionary


@pytest.mark.token
@pytest.mark.expired_at_and_no_expired_rt
def test_t01_should_return_401_with_access_token_expired_type(authedClientForTokenTest, exSession, httpHeaders):

    client = authedClientForTokenTest(access_token_expiry=1, refresh_token_expiry=1000)

    userId = exSession.query(User).filter(User.email == 'test@test.com').first()

    csrf_token = [cookie.value for cookie in client.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = client.put(
            '/users/{}'.format(userId),
            headers=httpHeaders
            )

    assert response.status_code == 401
    assert response.data == b'{"msg":"The access token has expired","status":401,"type":0}\n'

    client.teardown()


@pytest.mark.token
@pytest.mark.refresh_at
def test_t01_should_return_200_with_new_access_token_and_refresh_token(authedClientForTokenTest, exSession, httpHeaders):

    client = authedClientForTokenTest(access_token_expiry=1, refresh_token_expiry=1000)

    print('*** cookie in client')
    print(vars(client.cookie_jar))

    # NOTE: when request for refresh token, need to send 'csrf_refresh_token' as X-CSRF-TOKEN (don't send access token one)
    csrf_refresh_token = [cookie.value for cookie in client.cookie_jar if cookie.name == 'csrf_refresh_token'][0]
    csrf_access_token = [cookie.value for cookie in client.cookie_jar if cookie.name == 'csrf_access_token'][0]
    access_token = [cookie.value for cookie in client.cookie_jar if cookie.name == 'access_token_cookie'][0]
    refresh_token = [cookie.value for cookie in client.cookie_jar if cookie.name == 'refresh_token_cookie'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_refresh_token

    response = client.post(
            '/token/refresh',
            headers=httpHeaders
            )

    newTokens = mapCookieInHeaderToDictionary(response.headers)

    data = decodeResponseByteJsonToDictionary(response.data)

    print(data)

    assert response.status_code == 200
    assert access_token != newTokens['access_token_cookie']
    assert refresh_token != newTokens['refresh_token_cookie']
    assert csrf_access_token != newTokens['csrf_access_token']
    assert csrf_refresh_token != newTokens['csrf_refresh_token']

    client.teardown()


@pytest.mark.token
@pytest.mark.expired_at_and_expired_rt
def test_t02_should_return_401_with_both_access_token_and_refresh_token_expired_type(authedClientForTokenTest, exSession, httpHeaders):

    client = authedClientForTokenTest(access_token_expiry=1, refresh_token_expiry=1)

    # NOTE: when request for refresh token, need to send 'csrf_refresh_token' as X-CSRF-TOKEN (don't send access token one)
    csrf_refresh_token = [cookie.value for cookie in client.cookie_jar if cookie.name == 'csrf_refresh_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_refresh_token

    response = client.post(
            '/token/refresh',
            headers=httpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    print(data)

    assert response.status_code == 401
    assert data['type'] == 1

    client.teardown()


@pytest.mark.token
@pytest.mark.no_at_and_rt
def test_t02_should_return_401_with_neither_access_token_nor_refresh_token_type(client, exSession, httpHeaders):

    response = client.put(
            '/users/123',
            headers=httpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    print(data)

    assert response.status_code == 401
    assert data['type'] == 2
