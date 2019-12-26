from utils.util import printObject, decodeResponseByteJsonToDictionary
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.BlogImageModel import BlogImage
from Infrastructure.DataModels.BlogModel import Blog
import pytest
import os
import json
from typing import List
from utils.util import parseStrToDate


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
def test_blogs_id_get_endpoint_should_return_404_when_specified_blog_does_not_exist(client, blogsSeededFixture):

    response = client.get('/blogs/1222222')
    assert 404 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_get_id
def test_blogs_id_get_endpoint_should_return_200_when_specified_blog_exist(client, blogsSeededFixture):

    response = client.get('/blogs/1')
    assert 200 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
def test_b05_blogs_put_endpoint_should_return_401_code_since_unauthorized_access(client, database, application, multipartHttpHeaders):

    response = client.put('/blogs/1')
    assert 401 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
def test_b06_blogs_put_endpoint_should_allow_authed_user_to_get_404_code_since_target_blog_does_not_exist(authedClient, database, application, multipartHttpHeaders, testBlogDataWithMainImage):

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClient.put(
            '/blogs/{}'.format(12342),
            data=testBlogDataWithMainImage,
            headers=multipartHttpHeaders
            )

    assert 404 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
def test_b07_blogs_put_endpoint_should_allow_authed_user_to_get_400_code_since_input_is_invalid(authedClient, database, application, multipartHttpHeaders):

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
def test_b08_blogs_put_endpoint_should_allow_authed_user_to_get_200_code(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, testBlogData):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).get(2)
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data=testBlogData,
            headers=multipartHttpHeaders
            )

    assert 200 == response.status_code


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
def test_b09_blogs_put_endpoint_should_allow_authed_user_to_return_updated_blog(authedClientWithBlogSeeded, database, application, multipartHttpHeaders):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).get(2)  # blogid = 2 does not have any mainImage and blogimages
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
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


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_main_image
def test_b10_blogs_put_endpoint_should_return_updated_blog_with_mainImage_when_user_add_new_mainImage_to_unset_mainImage(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).get(2)  # blogid = 2 which does not have mainImage
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
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
        blog = database.session.query(Blog).get(1)  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
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
        blog = database.session.query(Blog).get(1)  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
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
        blog = database.session.query(Blog).get(1)  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
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
        blog = database.session.query(Blog).get(1)  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    blogImagePaths: List[str] = list(map(lambda blogImage: blogImage.path, blog.blogImages))
    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(blog.userId), testFileStorage.filename))

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/2'))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
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
    print(os.listdir('./temp/uploads/2'))

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
def test_b11_blogs_put_endpoint_should_return_should_return_updated_blog_with_updated_blogImagePaths_when_user_delete_one_of_the_existing_blog_image_in_content(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage, testExistingFileStorage, testExistingFileStorage1, testExistingFileStorage2):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).get(1)  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    blogImagePaths: List[str] = list(map(lambda blogImage: blogImage.path, blog.blogImages))
    del blogImagePaths[0]

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/2'))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                },
            headers=multipartHttpHeaders
            )

    print('*** current temp directory content after request')
    print(os.listdir('./temp/uploads/2'))

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
        blog = database.session.query(Blog).get(1)  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    blogImagePaths: List[str] = list(map(lambda blogImage: blogImage.path, blog.blogImages))

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/2'))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
                'title': 'updated_title',
                'subtitle': 'updated_subtitle',
                'content': 'updated_content',
                'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
                'blogImagePaths': json.dumps(blogImagePaths, separators=(',', ':')),
                },
            headers=multipartHttpHeaders
            )

    print('*** current temp directory content after request')
    print(os.listdir('./temp/uploads/2'))

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
        blog = database.session.query(Blog).get(1)  # get blogid = 1 which has mainImage already
        blogId = blog.id

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    blogImagePaths: List[str] = list(map(lambda blogImage: blogImage.path, blog.blogImages))
    del blogImagePaths[0]
    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(blog.userId), testFileStorage1.filename))

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/2'))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
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
    print(os.listdir('./temp/uploads/2'))

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    assert os.path.join(str(blog.userId), testExistingFileStorage.filename) in data['blog']['mainImageUrl']
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage1.filename)) is not True
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage2.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testFileStorage1.filename))


@pytest.mark.blogs_src
@pytest.mark.blogs_src_put
@pytest.mark.blogs_src_put_blog_images
def test_b13_blogs_put_endpoint_should_return_updated_blog_with_updated_blogImagePaths_when_user_add_multiple_blog_image_in_content(authedClientWithBlogSeeded, database, application, multipartHttpHeaders, setupTempUploadDirWithImageFile, testFileStorage3, testFileStorage2, testExistingFileStorage, testExistingFileStorage1, testExistingFileStorage2):

    blogId = None

    with application.app_context():
        blog = database.session.query(Blog).get(1)  # get blogid = 1 which has mainImage already
        blogId = blog.id
        blogImageModels = database.session.query(BlogImage).all()

    print("*** blogImageModels")
    print(blogImageModels[0].blogId)

    csrf_token = [cookie.value for cookie in authedClientWithBlogSeeded.cookie_jar if cookie.name == 'csrf_access_token'][0]
    multipartHttpHeaders['X-CSRF-TOKEN'] = csrf_token

    blogImagePaths: List[str] = list(map(lambda blogImage: blogImage.path, blog.blogImages))
    del blogImagePaths[0]
    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(blog.userId), testFileStorage3.filename))
    blogImagePaths.append(os.path.join(application.config.get('PUBLIC_FILE_FOLDER'), str(blog.userId), testFileStorage2.filename))

    print('*** current temp directory content before request')
    print(os.listdir('./temp/uploads/2'))

    response = authedClientWithBlogSeeded.put(
            '/blogs/{}'.format(blogId),
            data={
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
    print(os.listdir('./temp/uploads/2'))

    data = decodeResponseByteJsonToDictionary(response.data)

    assert 200 == response.status_code
    assert 'updated_title' == data['blog']['title']
    assert 'updated_subtitle' == data['blog']['subtitle']
    assert 'updated_content' == data['blog']['content']
    assert os.path.join(str(blog.userId), testExistingFileStorage.filename) in data['blog']['mainImageUrl']
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage1.filename)) is not True
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testExistingFileStorage2.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testFileStorage3.filename))
    assert os.path.exists(os.path.join(application.config.get('APP_ROOT'), application.config.get('UPLOAD_FOLDER'), str(blog.userId), testFileStorage2.filename))
