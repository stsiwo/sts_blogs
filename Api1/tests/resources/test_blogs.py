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
