import utils
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.BlogModel import Blog
import pytest

# GET /blogs/{id}/comments functional testing
# bc_get01: 404 status code since no comments for the blog
# bc_get02: 200 status code
# bc_get03: response data contains list of comments for the blog

@pytest.mark.blog_comment_get
def test_bc_get01_blog_comment_get_endpoint_should_return_404_since_no_blogs_data(client):

    response = client.get('/blogs/111111/comments')
    assert 404 == response.status_code


@pytest.mark.blog_comment_get
def test_bc_get02_blog_comment_get_endpoint_should_return_200_code(client, blogCommentsSeededFixture, exSession):

    blog = exSession.query(Blog).get(1)

    response = client.get('/blogs/' + str(blog.id) + '/comments')
    assert 200 == response.status_code


@pytest.mark.blog_comment_get
def test_bc_get03_blog_comment_get_endpoint_should_return_list_of_comments_for_the_blog(client, blogCommentsSeededFixture, exSession):

    blog = exSession.query(Blog).get(1)

    response = client.get('/blogs/' + str(blog.id) + '/comments')

    data = utils.decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for comment in data:
        assert comment['id'] is not None


# POST /blogs/{id}/comments functional testing
# bc_post01: 400 statuc code for invalid input
# bc_post02: 201 status code
# bc_post03: response data contains newly created comment


@pytest.mark.blog_comment_post_
def test_bc_post01_blog_comment_post_endpoint_should_return_400_code_since_invalid_input(client, httpHeaders, blogCommentsSeededFixture, exSession):

    blog = exSession.query(Blog).get(1)

    response = client.post(
            '/blogs/' + str(blog.id) + '/comments',
            json={},
            headers=httpHeaders)

    assert 400 == response.status_code


@pytest.mark.blog_comment_post_
def test_bc_post02_blog_comment_post_endpoint_should_return_201_code_for_successfully_created_comment(client, httpHeaders, blogCommentsSeededFixture, exSession):

    blog = exSession.query(Blog).get(1)

    response = client.post(
            '/blogs/' + str(blog.id) + '/comments',
            json={
                'title': "test-title",
                'content': "test-content"
                },
            headers=httpHeaders)

    assert 201 == response.status_code


@pytest.mark.blog_comment_post_
def test_bc_post03_blog_comment_post_endpoint_should_return_newly_created_comment_when_successfully_created(client, httpHeaders, blogCommentsSeededFixture, exSession):

    blog = exSession.query(Blog).get(1)

    response = client.post(
            '/blogs/' + str(blog.id) + '/comments',
            json={
                'title': "test-title",
                'content': "test-content"
                },
            headers=httpHeaders)

    data = utils.decodeResponseByteJsonToDictionary(response.data)

    assert data['id'] is not None


# DELETE /blogs/{id}/comments functional testing
# bc_delete01: 401 statuc code since unauthorized access by guest user
# bc_delete02: 401 statuc code since unauthorized access by member user
# bc_delete02: 404 statuc code since there is no comments for the blog
# bc_delete03: 204 status code when successfully delete all comments


def test_bc_delete01_blog_comment_delete_endpoint_should_return_401_code_for_unauthorized_access_by_guest_user(client, blogCommentsSeededFixture, exSession):

    blog = exSession.query(Blog).get(2)

    response = client.delete(
            '/blogs/' + str(blog.id) + '/comments',
            )

    assert 401 == response.status_code


def test_bc_delete02_blog_comment_delete_endpoint_should_return_401_code_for_unauthorized_access_by_member_user(authedClient, blogCommentsSeededFixture, exSession, httpHeaders):

    blog = exSession.query(Blog).get(2)

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.delete(
            '/blogs/' + str(blog.id) + '/comments',
            headers=httpHeaders
            )

    assert 401 == response.status_code


def test_bc_delete03_blog_comment_delete_endpoint_should_return_404_code_since_there_is_no_comments_for_the_blog(authedAdminClient, blogCommentsSeededFixture, exSession, httpHeaders):

    blog = exSession.query(Blog).get(2)

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedAdminClient.delete(
            '/blogs/' + str(blog.id) + '/comments',
            headers=httpHeaders
            )

    assert 404 == response.status_code


def test_bc_delete04_blog_comment_delete_endpoint_should_return_204_code_for_successfully_deletion(authedAdminClient, blogCommentsSeededFixture, exSession, httpHeaders):

    blog = exSession.query(Blog).get(1)

    csrf_token = [cookie.value for cookie in authedAdminClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedAdminClient.delete(
            '/blogs/' + str(blog.id) + '/comments',
            headers=httpHeaders
            )

    assert 204 == response.status_code
