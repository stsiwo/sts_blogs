from utils.util import printObject, decodeResponseByteJsonToDictionary
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.BlogImageModel import BlogImage
from Infrastructure.DataModels.BlogModel import Blog
import pytest
import os
import json
from typing import List
from utils.util import parseStrToDate
import uuid


@pytest.mark.blogs_src
@pytest.mark.blogs_src_get
def test_b01_blogs_get_endpoint_should_return_404_even_if_no_blogs_data(client):

    response = client.get('/blogs')

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert data.get('blogs') == []


@pytest.mark.blogs_src
@pytest.mark.blogs_src_get
def test_b02_blogs_get_endpoint_should_return_202(client, blogsSeededFixture):

    response = client.get('/blogs')
    assert 200 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_get
def test_b03_blogs_get_endpoint_should_return_202_and_blogs_json(client, blogsSeededFixture):

    response = client.get('/blogs')
    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data['blogs']:
        assert blog['id'] is not None


@pytest.mark.blogs_src
@pytest.mark.blogs_src_get
def test_b04_blogs_get_endpoint_should_return_202_and_blogs_json_with_user_dependencies(client, blogsSeededFixture):

    response = client.get('/blogs')
    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data['blogs']:
        assert blog['author']['id'] is not None


@pytest.mark.blogs_src
@pytest.mark.blogs_src_get
def test_b041_blogs_get_endpoint_should_return_queried_blogs(client, blogsSeededFixture):

    response = client.get('/blogs?limit=30&page=1&tags=js&tags=webpack')
    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    assert data is not None

    for blog in data['blogs']:
        assert blog['id'] is not None


@pytest.mark.blogs_src
@pytest.mark.blogs_src_get
def test_b041_blogs_get_endpoint_should_return_specified_view_model(client, blogsSeededFixture):

    response = client.get('/blogs?limit=30&page=1&tags=js&tags=webpack')
    assert 200 == response.status_code

    data = decodeResponseByteJsonToDictionary(response.data)

    print('client response data')
    for blog in data['blogs']:
        print(json.dumps(blog, indent=4))

    assert data is not None

    for blog in data['blogs']:
        assert blog['id'] is not None
        # assert blog['mainImageUrl'] is not None
        assert blog['title'] is not None
        assert blog['subtitle'] is not None
        assert blog['content'] is not None
        assert blog['tags'] is not None
        assert blog['createdDate'] is not None
        assert blog['author'] is not None
        assert blog['author']['id'] is not None
        assert blog['author']['name'] is not None
        assert blog['author']['avatarUrl'] is not None


@pytest.mark.blogs_src
@pytest.mark.blogs_src_get_id
def test_blogs_id_get_endpoint_should_return_200_when_specified_blog_exist(client, blogsSeededFixture):

    targetBlog = blogsSeededFixture[0]

    response = client.get('/blogs/' + targetBlog.id)
    assert 200 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
def test_b05_blogs_put_endpoint_should_return_401_code_since_unauthorized_access(client, database, application, multipartHttpHeaders):

    response = client.put('/blogs/1')
    assert 401 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
def test_b07_blogs_put_endpoint_should_allow_authed_user_to_get_400_code_since_input_is_invalid(authedClient, database, application, multipartHttpHeaders, usersSeededFixture):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/blogs/{}'.format(12342),
            data={
                'content': 'updated_title'
                },
            headers=multipartHttpHeaders
            )

    assert 400 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
def test_b08_blogs_put_endpoint_should_allow_authed_user_to_get_200_code(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, usersSeededFixture):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.userId == usersSeededFixture.id).first()
        blogId = blog.id

    blogImagePaths: List[str] = list(map(lambda blogImage: blogImage.path, blog.blogImages))

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': usersSeededFixture.id,
                'title': "test-title",
                'subtitle': "test-subtitle",
                'content': "test-content",
                'createdDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                },
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
def test_b09_blogs_put_endpoint_should_allow_authed_user_to_return_updated_blog(authedClientWithBlogSeeded, database, application, multipartHttpHeaders):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    blogImagePaths: List[str] = list(map(lambda blogImage: blogImage.path, blog.blogImages))

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                },
            headers=multipartHttpHeaders
            )

    printObject(response)

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_main_image
def test_b10_blogs_put_endpoint_should_return_updated_blog_with_mainImage_when_user_add_new_mainImage_to_unset_mainImage(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'mainImage': testFileStorage.stream
                },
            headers=multipartHttpHeaders
            )

    printObject(response)

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_content' == data['blog']['content']
    assert os.path.join(str(blog.userId), testFileStorage.filename) in data['blog']['mainImageUrl']

    # check updated file exists
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testFileStorage.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_main_image
def test_b11_blogs_put_endpoint_should_return_should_return_updated_blog_without_mainImage_when_200_when_user_remove_existing_mainImage(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testExistingFileStorage):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'isDeleteMainImage': '1'
                },
            headers=multipartHttpHeaders
            )

    printObject(response)

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    assert data['blog']['mainImageUrl'] is None
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename)) is not True


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_main_image
def test_b11_blogs_put_endpoint_should_return_updated_blog_with_new_mainImage_when_user_update_existing_mainImage_with_new_one(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testExistingFileStorage, testFileStorage):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'mainImage': testFileStorage.stream
                },
            headers=multipartHttpHeaders
            )

    printObject(response)

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    assert os.path.join(str(blog.userId), testFileStorage.filename) in data['blog']['mainImageUrl']
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename)) is not True
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testFileStorage.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_main_image
def test_b11_blogs_put_endpoint_should_return_updated_blog_with_existing_mainImage_when_user_unchange_the_mainImage(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testExistingFileStorage):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                },
            headers=multipartHttpHeaders
            )

    printObject(response)

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    assert os.path.join(str(blog.userId), testExistingFileStorage.filename) in data['blog']['mainImageUrl']
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_blog_images
def test_b11_blogs_put_endpoint_should_return_updated_blog_with_updated_blogImagePaths_when_user_add_new_blog_image_content_to_existing_content(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage, testExistingFileStorage, testExistingFileStorage1, testExistingFileStorage2):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    blogImagePaths: List[str] = list(map(lambda blogImage: blogImage.path, blog.blogImages))
    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(blog.userId), testFileStorage.filename))

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                'blogImages[]': testFileStorage.stream
                },
            headers=multipartHttpHeaders
            )

    print('*** current temp directory content after request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    assert os.path.join(str(blog.userId), testExistingFileStorage.filename) in data['blog']['mainImageUrl']
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage1.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage2.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testFileStorage.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_blog_images
@pytest.mark.hahaha
def test_b11_blogs_put_endpoint_should_return_should_return_updated_blog_with_updated_blogImagePaths_when_user_delete_one_of_the_existing_blog_image_in_content(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage, testExistingFileStorage, testExistingFileStorage1, testExistingFileStorage2):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    # create blog image paths list for request but remove testExistingFileStorage1's path for test
    blogImagePaths: List[str] = []
    for blogImage in blog.blogImages:
        if blogImage.path.find(testExistingFileStorage1.filename) == -1:
            blogImagePaths.append(blogImage.path)

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                },
            headers=multipartHttpHeaders
            )

    print('*** current temp directory content after request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    assert os.path.join(str(blog.userId), testExistingFileStorage.filename) in data['blog']['mainImageUrl']
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage1.filename)) is not True
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage2.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_blog_images
def test_b11_blogs_put_endpoint_should_return_updated_blog_with_unchanged_blogImagePaths_when_user_did_not_modify_the_blog_content(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage, testExistingFileStorage, testExistingFileStorage1, testExistingFileStorage2):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    blogImagePaths: List[str] = list(map(lambda blogImage: blogImage.path, blog.blogImages))

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                },
            headers=multipartHttpHeaders
            )

    print('*** current temp directory content after request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    assert os.path.join(str(blog.userId), testExistingFileStorage.filename) in data['blog']['mainImageUrl']
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage1.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage2.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_blog_images
def test_b12_blogs_put_endpoint_should_return_updated_blog_with_updated_blogImagePaths_when_user_delete_and_add_blog_image_in_content(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage1, testExistingFileStorage, testExistingFileStorage1, testExistingFileStorage2):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    # create blog image paths list for request but remove testExistingFileStorage1's path for test
    blogImagePaths: List[str] = []
    for blogImage in blog.blogImages:
        if blogImage.path.find(testExistingFileStorage1.filename) == -1:
            blogImagePaths.append(blogImage.path)
    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(blog.userId), testFileStorage1.filename))

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                'blogImages[]': testFileStorage1.stream
                },
            headers=multipartHttpHeaders
            )

    print('*** current temp directory content after request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    assert os.path.join(str(blog.userId), testExistingFileStorage.filename) in data['blog']['mainImageUrl']
    # main image file
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename))
    # updated blog image files
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage1.filename)) is not True
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage2.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testFileStorage1.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_blog_images
def test_b13_blogs_put_endpoint_should_return_updated_blog_with_updated_blogImagePaths_when_user_add_multiple_blog_image_in_content_and_delete_existing_one(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage3, testFileStorage2, testExistingFileStorage, testExistingFileStorage1, testExistingFileStorage2):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).filter(Blog.mainImageUrl.isnot(None)).first()  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    # create blog image paths list for request but remove testExistingFileStorage1's path for test
    blogImagePaths: List[str] = []
    for blogImage in blog.blogImages:
        if blogImage.path.find(testExistingFileStorage1.filename) == -1:
            blogImagePaths.append(blogImage.path)

    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(blog.userId), testFileStorage3.filename))
    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(blog.userId), testFileStorage2.filename))

    print("*** after blogImagePaths ***")
    print(blogImagePaths)

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'userId': str(blog.userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                'blogImages[]': [testFileStorage3.stream, testFileStorage2.stream]
                },
            headers=multipartHttpHeaders
            )

    print('*** current temp directory content after request')
    print(os.listdir('./temp/uploads/' + blog.userId))

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    # main image
    assert os.path.join(str(blog.userId), testExistingFileStorage.filename) in data['blog']['mainImageUrl']
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename))
    # blog image content
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage1.filename)) is not True
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage2.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testFileStorage3.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testFileStorage2.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_create
def test_b14_blogs_put_endpoint_should_create_blog_without_any_images_main_image_and_blog_images(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, usersSeededFixture):

    newBlogId = str(uuid.uuid4())
    user = usersSeededFixture

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(newBlogId),
            data={
                'userId': str(user.id),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                },
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_create
def test_b14_blogs_put_endpoint_should_create_blog_with_only_main_image_without_blog_images(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage, usersSeededFixture):

    newBlogId = str(uuid.uuid4())
    user = usersSeededFixture
    userId = user.id  # separate due to "sqlalchemy.orm.exc.DetachedInstanceError: Instance <User at 0x7f033cc5c460> is not bound to a Session; attribute refresh operation cannot proceed (Background on this error at: http://sqlalche.me/e/bhk3)"

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(newBlogId),
            data={
                'userId': str(userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'mainImage': testFileStorage.stream
                },
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']

    # assert server return mainImageUrl
    assert os.path.join(str(userId), testFileStorage.filename) in data['blog']['mainImageUrl']
    # assert main image is stored at server correctly


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_create
def test_b14_blogs_put_endpoint_should_create_blog_with_main_image_and_multiple_blog_images(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage, usersSeededFixture, testFileStorage3, testFileStorage2):

    newBlogId = str(uuid.uuid4())
    user = usersSeededFixture
    userId = user.id  # separate due to "sqlalchemy.orm.exc.DetachedInstanceError: Instance <User at 0x7f033cc5c460> is not bound to a Session; attribute refresh operation cannot proceed (Background on this error at: http://sqlalche.me/e/bhk3)"

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    blogImagePaths: [str] = []
    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(userId), testFileStorage3.filename))
    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(userId), testFileStorage2.filename))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(newBlogId),
            data={
                'userId': str(userId),
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',  # content should match with blog content images
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'mainImage': testFileStorage.stream,
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                'blogImages[]': [testFileStorage3.stream, testFileStorage2.stream]
                },
            headers=multipartHttpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']

    # assert server return mainImageUrl
    assert os.path.join(str(userId), testFileStorage.filename) in data['blog']['mainImageUrl']
    # assert main image is stored at server correctly
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(userId), testFileStorage.filename))

    # assert blog images is stored at server correctly
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(userId), testFileStorage2.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(userId), testFileStorage3.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_patch
def test_b14_blogs_put_endpoint_should_create_blog_with_multiple_blog_images_but_not_main_image(authedClientWithBlogSeeded, exSession, application, httpHeaders, setupTempUploadDirWithImageFile, usersSeededFixture, testFileStorage3, testFileStorage2):

    existingBlog = exSession.query(Blog).first()

    # csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    # httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.patch(
            '/blogs/{}'.format(existingBlog.id),
            json={
                "public": "1"
                },
            headers=httpHeaders
            )

    assert 401 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_patch
def test_b14_blogs_put_endpoint_should_return_400_for_invalid_input_in_request(authedClientWithBlogSeeded, application, exSession, httpHeaders, setupTempUploadDirWithImageFile, usersSeededFixture, testFileStorage3, testFileStorage2):

    existingBlog = exSession.query(Blog).first()

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.patch(
            '/blogs/{}'.format(existingBlog.id),
            json={
                "some-wrong-key": "1"
                },
            headers=httpHeaders
            )

    assert 400 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_patch
def test_b14_blogs_put_endpoint_should_return_200_when_successfully_update_public_column_to_True(authedClientWithBlogSeeded, application, exSession, httpHeaders, setupTempUploadDirWithImageFile, usersSeededFixture, testFileStorage3, testFileStorage2):

    existingBlog = exSession.query(Blog).first()

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.patch(
            '/blogs/{}'.format(existingBlog.id),
            json={
                "public": "1",
                "userId": existingBlog.user.id,
                "title": existingBlog.title,
                "subtitle": existingBlog.subtitle
                },
            headers=httpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert True is data.get("public")


@pytest.mark.blogs_src
@pytest.mark.blogs_src_patch
def test_b14_blogs_put_endpoint_should_return_200_when_successfully_update_public_column_to_False(authedClientWithBlogSeeded, application, exSession, httpHeaders, setupTempUploadDirWithImageFile, usersSeededFixture, testFileStorage3, testFileStorage2):

    existingBlog = exSession.query(Blog).first()

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.patch(
            '/blogs/{}'.format(existingBlog.id),
            json={
                "public": "0",
                "userId": existingBlog.user.id,
                "title": existingBlog.title,
                "subtitle": existingBlog.subtitle
                },
            headers=httpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert False is data.get("public")


@pytest.mark.blogs_src
@pytest.mark.blogs_src_patch
def test_b14_blogs_put_endpoint_should_return_404_when_there_is_no_blog_exists(authedClientWithBlogSeeded, application, exSession, httpHeaders, setupTempUploadDirWithImageFile, usersSeededFixture, testFileStorage3, testFileStorage2):

    noExistingBlogId = str(uuid.uuid4())

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    httpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.patch(
            '/blogs/{}'.format(noExistingBlogId),
            json={
                "public": "0",
                "userId": usersSeededFixture.id,
                "title": "does not exist title",
                "subtitle": "does not exist subtitle"
                },
            headers=httpHeaders
            )

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 404 == response.status_code
