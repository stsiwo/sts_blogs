import utils
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.BlogModel import Blog


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


def test_b06_blogs_put_endpoint_should_allow_authed_user_to_get_404_code_since_target_blog_does_not_exist(authedClient, database, application, httpHeaders):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/blogs/{}'.format(12342),
            json={
                'title': 'updated_title',
                'content': 'updated_content'
                },
            headers=httpHeaders
            )

    assert 404 == response.status_code


def test_b07_blogs_put_endpoint_should_allow_authed_user_to_get_400_code_since_input_is_invalid(authedClient, database, application, httpHeaders):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/blogs/{}'.format(12342),
            json={
                'content': 'updated_title'
                },
            headers=httpHeaders
            )

    assert 400 == response.status_code


def test_b08_blogs_put_endpoint_should_allow_authed_user_to_get_200_code(authedClientWithBlogSeeded, database, application, httpHeaders):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).join(Blog.user).filter(User.email == 'test@test.com').first()
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            json={
                'title': 'updated_title',
                'content': 'updated_content'
                },
            headers=httpHeaders
            )

    assert 200 == response.status_code


def test_b09_blogs_put_endpoint_should_allow_authed_user_to_return_updated_blog(authedClientWithBlogSeeded, database, application, httpHeaders):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).join(Blog.user).filter(User.email == 'test@test.com').first()
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            json={
                'title': 'updated_title',
                'content': 'updated_content'
                },
            headers=httpHeaders
            )

    utils.printObject(response)

    data = utils.decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['title']
    assert 'updated_content' == data['content']
