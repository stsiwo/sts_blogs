import utils
from Infrastructure.DataModels.UserModel import User


def test_ub01_blogs_get_endpoint_should_return_404_since_no_blogs_data(client):

    response = client.get('/users/1/blogs')
    assert 404 == response.status_code


def test_ub02_blogs_get_endpoint_should_return_200(client, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id

    response = client.get('/users/' + str(userId) + '/blogs')
    assert 200 == response.status_code


def test_ub03_blogs_get_endpoint_should_return_200_and_blogs_json(client, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id

    response = client.get('/users/' + str(userId) + '/blogs')
    assert 200 == response.status_code

    data = utils.decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data:
        assert blog['id'] is not None


def test_ub04_blogs_get_endpoint_should_return_202_and_blogs_json_with_user_dependencies(client, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id

    response = client.get('/users/' + str(userId) + '/blogs')
    assert 200 == response.status_code

    data = utils.decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data:
        assert blog['user']['id'] == userId

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

