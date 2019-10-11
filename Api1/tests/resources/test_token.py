import utils


def test_token_auth_endpoint(client):
    """Start with a blank database."""

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }

    rv = client.post('/token/auth', json={
        'username': 'test',
        'password': 'test'
        }, headers=headers)

    utils.prettyPrint(rv.status_code)
    assert 200 == rv.status_code


def test_token_refresh_endpoint(client):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }

    rv = client.post('/token/auth', 'http://localhost', json={
        'username': 'test',
        'password': 'test'
        }, headers=headers)

    # I don't know to how to retrieve cookie and send it with request for authorized user
    for item in rv.headers:
        if (item[0] == 'Set-Cookie'):
            cookie = item[1].split("=")
            client.set_cookie('http://localhost', cookie[0], cookie[1])

    rv = client.post('/token/refresh', 'http://localhost')

    utils.prettyPrint(rv.status_code)
    assert 200 == rv.status_code


def test_token_remove_endpoint(client):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }

    rv = client.post('/token/auth', 'http://localhost', json={
        'username': 'test',
        'password': 'test'
        }, headers=headers)

    # I don't know to how to retrieve cookie and send it with request for authorized user
    for item in rv.headers:
        if (item[0] == 'Set-Cookie'):
            cookie = item[1].split("=")
            client.set_cookie('http://localhost', cookie[0], cookie[1])

    rv = client.post('/token/remove', 'http://localhost')

    utils.prettyPrint(rv.status_code)
    assert 200 == rv.status_code
