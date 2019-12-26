from utils.util import decodeResponseByteJsonToDictionary
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.BlogModel import Blog
import pytest
import os
import json
from utils.util import printObject


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

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]

    response = authedAdminClient.get('/users/' + str(userId) + '/blogs', headers={'X-CSRF-TOKEN': csrf_token})
    assert 200 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get
def test_ub04_blogs_get_endpoint_should_allow_the_user_to_access(authedClient, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).join(User.roles).filter(Role.name == 'member').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    response = authedClient.get('/users/' + str(userId) + '/blogs', headers={'X-CSRF-TOKEN': csrf_token})
    assert 200 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get
def test_ub05_blogs_get_endpoint_should_return_200_with_its_own_blogs(authedClient, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    response = authedClient.get('/users/' + str(userId) + '/blogs', headers={'X-CSRF-TOKEN': csrf_token})
    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data['blogs']:
        assert blog['id'] is not None


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
def test_ub08_blogs_post_endpoint_should_return_201_when_successfully_created(authedClient, database, application, multipartHttpHeaders, testNewBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testNewBlogData,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 201 == response.status_code
    assert data['blog']['id'] is not None


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub10_blogs_post_endpoint_should_return_location_header_to_new_blog(authedClient, database, application, multipartHttpHeaders, testNewBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testNewBlogData,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert response.headers['location'] == 'http://localhost/blogs/{}'.format(data['blog']['id'])


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub11_blogs_post_endpoint_should_return_201_with_created_blog_when_admin_request_creating_the_blog(authedAdminClient, database, application, multipartHttpHeaders, usersSeededFixture, testNewBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedAdminClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testNewBlogData,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 201 == response.status_code
    assert data['blog']['id'] is not None


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub13_blogs_post_endpoint_should_return_location_header_to_new_blog(authedAdminClient, database, application, multipartHttpHeaders, usersSeededFixture, testNewBlogData):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedAdminClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testNewBlogData,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert response.headers['location'] == 'http://localhost/blogs/{}'.format(data['blog']['id'])


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub14_blogs_post_endpoint_should_return_with_created_blog_with_main_image_url_when_request_include_main_image(authedClient, database, application, multipartHttpHeaders, testNewBlogDataWithMainImage, testFileStorage):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testNewBlogDataWithMainImage,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert os.path.join(str(userId), testFileStorage.filename) in data['blog']['mainImageUrl']


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_post
def test_ub15_blogs_post_endpoint_should_return_201_with_created_blog_with_blog_images_when_user_add_multiple_blog_images_in_content(authedClient, database, application, multipartHttpHeaders, testNewBlogDataWithMainImage, testFileStorage, testFileStorage1, testFileStorage2):

    userId = None

    with application.app_context():
        user = database.session.query(User).filter_by(email='test@test.com').first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    testNewBlogDataWithMainImage['blogImagePaths'] = json.dumps([
            os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(userId), testFileStorage1.filename),
            os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(userId), testFileStorage2.filename)
            ], separators=(',', ':'))

    testNewBlogDataWithMainImage['blogImages[]'] = [
            testFileStorage1.stream,
            testFileStorage2.stream
            ]

    response = authedClient.post(
            '/users/' + str(userId) + '/blogs',
            data=testNewBlogDataWithMainImage,
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert os.path.join(str(userId), testFileStorage.filename) in data['blog']['mainImageUrl']
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(userId), testFileStorage1.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(userId), testFileStorage2.filename))


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_delete
def test_ub15_blogs_delete_endpoint_should_return_401_code_since_unauthorized_access(client, database, application, httpHeaders):

    response = client.delete('/users/1/blogs')
    assert 401 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_delete
def test_ub16_blogs_delete_endpoint_should_allow_authed_user_to_get_201_code(authedClientWithBlogSeeded, database, application, httpHeaders):

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
def test_ub17_blogs_delete_endpoint_should_allow_authed_user_to_delete_all_his_blogs(authedClientWithBlogSeeded, database, application, httpHeaders):

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
def test_ub18_blogs_delete_endpoint_should_allow_authed_user_to_delete_all_his_blogs_but_return_404_code_since_no_blogs(authedClient, database, application, httpHeaders):

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
