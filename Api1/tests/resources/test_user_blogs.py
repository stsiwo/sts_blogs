from utils.util import decodeResponseByteJsonToDictionary
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.BlogModel import Blog
import pytest
from utils.util import printObject


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get
def test_ub01_blogs_get_endpoint_should_return_404_since_no_blogs_data(authedClient):

    response = authedClient.get('/users/1/blogs')
    assert 404 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get
def test_ub02_blogs_get_endpoint_should_return_401_for_unauthorized_access(client):

    response = client.get('/users/1/blogs')
    assert 401 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get
def test_ub03_blogs_get_endpoint_should_allow_admin_user_to_access(authedAdminClient, application, database, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).join(User.roles).filter(Role.name == 'member').first()
        userId = user.id

    response = authedAdminClient.get('/users/' + str(userId) + '/blogs')
    assert 200 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get
def test_ub04_blogs_get_endpoint_should_allow_the_user_to_access(authedClient, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).join(User.roles).filter(Role.name == 'member').first()
        userId = user.id

    response = authedClient.get('/users/' + str(userId) + '/blogs')
    assert 200 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get
def test_ub05_blogs_get_endpoint_should_allow_the_user_to_access_its_own_blogs(authedClient, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id

    response = authedClient.get('/users/' + str(userId) + '/blogs')
    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data:
        assert blog['id'] is not None


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get
def test_ub06_blogs_get_endpoint_should_return_202_and_blogs_json_with_user_dependencies(authedClient, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id

    response = authedClient.get('/users/' + str(userId) + '/blogs')
    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data:
        assert blog['user']['id'] == userId


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub07_blogs_post_endpoint_should_return_400_for_bad_request_for_invalid_input(authedClient, database, application, multipartHttpHeaders):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post('/users/' + str(userId) + '/blogs', headers=multipartHttpHeaders)
    assert 400 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub08_blogs_post_endpoint_should_allow_authed_user_to_get_201_code(authedClient, database, application, multipartHttpHeaders, testBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testBlogData,
            headers=multipartHttpHeaders
            )

    assert 201 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub09_blogs_post_endpoint_should_allow_authed_user_to_create_its_new_blog(authedClient, database, application, multipartHttpHeaders, testBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testBlogData,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    printObject(data)

    assert data['id'] is not None


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub09_1_blogs_post_endpoint_should_allow_authed_user_to_create_its_new_blog_with_image(authedClient, database, application, multipartHttpHeaders, testBlogDataWithMainImage, setupTempUploadDir):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testBlogDataWithMainImage,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data['id'] is not None


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub10_blogs_post_endpoint_should_return_location_header_to_new_blog(authedClient, database, application, multipartHttpHeaders, testBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testBlogData,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert response.headers['location'] == 'http://localhost/blogs/{}'.format(data['id'])


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub11_blogs_post_endpoint_should_allow_admin_user_to_get_201_code(authedAdminClient, database, application, multipartHttpHeaders, usersSeededFixture, testBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedAdminClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testBlogData,
            headers=multipartHttpHeaders
            )

    assert 201 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub12_blogs_post_endpoint_should_allow_authed_user_to_create_its_new_blog(authedAdminClient, database, application, multipartHttpHeaders, usersSeededFixture, testBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedAdminClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testBlogData,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data['id'] is not None


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub13_blogs_post_endpoint_should_return_location_header_to_new_blog(authedAdminClient, database, application, multipartHttpHeaders, usersSeededFixture, testBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedAdminClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testBlogData,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert response.headers['location'] == 'http://localhost/blogs/{}'.format(data['id'])


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_delete
def test_ub14_blogs_delete_endpoint_should_return_401_code_since_unauthorized_access(client, database, application, httpHeaders):

    response = client.delete('/users/1/blogs')
    assert 401 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_delete
def test_ub15_blogs_delete_endpoint_should_allow_authed_user_to_get_201_code(authedClientWithBlogSeeded, database, application, httpHeaders):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.delete(
            '/users/' + str(userId) + '/blogs',
            headers=httpHeaders
            )

    assert 204 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_delete
def test_ub16_blogs_delete_endpoint_should_allow_authed_user_to_delete_all_his_blogs(authedClientWithBlogSeeded, database, application, httpHeaders):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.delete(
            '/users/' + str(userId) + '/blogs',
            headers=httpHeaders
            )

    assert 204 == response.status_code

    with application.app_context():
        blogs = database.session.query(Blog).filter_by(userId=userId).all()
        assert len(blogs) == 0


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_delete
def test_ub17_blogs_delete_endpoint_should_allow_authed_user_to_delete_all_his_blogs_but_return_404_code_since_no_blogs(authedClient, database, application, httpHeaders):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.delete(
            '/users/' + str(userId) + '/blogs',
            headers=httpHeaders
            )

    assert 404 == response.status_code
