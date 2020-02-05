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
@pytest.mark.user_blog_src_get_id
def test_ub051_blogs_get_endpoint_should_return_404_when_specified_blog_does_not_exist(authedClient, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    response = authedClient.get('/users/' + str(userId) + '/blogs/' + 'blog-does-not_exit', headers={'X-CSRF-TOKEN': csrf_token})
    assert 404 == response.status_code


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get_id
def test_ub051_blogs_get_endpoint_should_return_200_when_specified_blog_exist_and_include_non_public(authedClient, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id
        targetBlogs = [blog for blog in blogsSeededFixture if blog.public is False]

    targetBlog = targetBlogs[0]

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    response = authedClient.get('/users/' + str(userId) + '/blogs/' + targetBlog.id, headers={'X-CSRF-TOKEN': csrf_token})
    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data is not None
    assert data['blog']['id'] == targetBlog.id
    assert data['blog']['public'] is False
    assert data['blog']['author']['id'] == userId


@pytest.mark.user_blog_src
@pytest.mark.user_blog_src_get_id
def test_ub051_blogs_get_endpoint_should_return_200_when_specified_blog_exist_and_include_public(authedClient, database, application, blogsSeededFixture):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id
        targetBlogs = [blog for blog in blogsSeededFixture if blog.public is True]

    targetBlog = targetBlogs[0]

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    response = authedClient.get('/users/' + str(userId) + '/blogs/' + targetBlog.id, headers={'X-CSRF-TOKEN': csrf_token})
    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data is not None
    assert data['blog']['id'] == targetBlog.id
    assert data['blog']['public'] is True
    assert data['blog']['author']['id'] == userId


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
