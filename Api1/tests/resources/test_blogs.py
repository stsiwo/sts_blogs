import utils


def test_b01_blogs_get_endpoint_should_return_404_since_no_blogs_data(client):

    response = client.get('/blogs')
    assert 404 == response.status_code


def test_b02_blogs_get_endpoint_should_return_202(client, blogsSeededFixture):

    response = client.get('/blogs')
    assert 200 == response.status_code


def test_b03_blogs_get_endpoint_should_return_202_and_blogs_json(client, blogsSeededFixture):

    response = client.get('/blogs')
    assert 200 == response.status_code

    data = utils.decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data:
        assert blog['id'] is not None


def test_b04_blogs_get_endpoint_should_return_202_and_blogs_json_with_user_dependencies(client, blogsSeededFixture):

    response = client.get('/blogs')
    assert 200 == response.status_code

    data = utils.decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data:
        assert blog['user']['id'] is not None


def test_b05_blogs_put_endpoint_should_return_401_code_since_unauthorized_access(client, database, application, httpHeaders):

    response = client.delete('/users/1/blogs')
    assert 401 == response.status_code


def test_b06_blogs_put_endpoint_should_allow_authed_user_to_get_201_code(authedClient, database, application, httpHeaders):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/users/' + str(userId) + '/blogs',
            headers=httpHeaders
            )

    assert 204 == response.status_code


# def test_blogs_post_endpoint(client):
# 
#     response = client.post('/blogs')
#     assert 202 == response.status_code
# 
# 
# def test_blogs_put_endpoint(client):
# 
#     response = client.put('/blogs')
#     assert 203 == response.status_code
# 
# 
# def test_blogs_patch_endpoint(client):
# 
#     response = client.patch('/blogs')
#     assert 204 == response.status_code
# 
# 
# def test_blogs_delete_endpoint(client):
# 
#     response = client.delete('/blogs')
#     assert 205 == response.status_code
