from tests.data.testUserWithMemberRoleSeeder import testUserWithMemberRoleSeeder
import pytest
import utils
from tests.data.factories.BlogFactory import BlogFactory
from tests.data.factories.RoleFactory import RoleFactory
from tests.data.factories.UserFactory import UserFactory
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.UserModel import User
from io import BytesIO, StringIO
from PIL import Image


# fixture for test_login
@pytest.fixture
def testUserWithMemberRoleFixture(database, application):

    with application.app_context():
        testUserWithMemberRoleSeeder(database)

    yield None


@pytest.fixture
def blogsSeededFixture(database, application):
    print("setup blogsSeededFixture fixture")

    with application.app_context():
        database.session.add(BlogFactory())
        database.session.add(BlogFactory())
        database.session.add(BlogFactory())

        blogs = database.session.query(Blog).all()
        utils.printObject(blogs)

        database.session.commit()

    yield None
    print("teardown blogsSeededFixture fixture")


@pytest.fixture
def rolesSeededFixture(database, application):
    print("setup rolesSeededFixture fixture")

    with application.app_context():
        database.session.add(RoleFactory(name='admin'))
        database.session.add(RoleFactory(name='member'))

        roles = database.session.query(Role).all()
        utils.printObject(roles)

        database.session.commit()

    yield None
    print("teardown rolesSeededFixture fixture")


@pytest.fixture
def usersSeededFixture(database, application):
    print("setup usersSeededFixture fixture")

    with application.app_context():
        database.session.add(UserFactory(
            name='test',
            email='test@test.com',
            password='test'
            ))

        users = database.session.query(User).all()
        utils.printObject(users)

        database.session.commit()

    yield None
    print("teardown usersSeededFixture fixture")


@pytest.fixture
def adminUserSeededFixture(database, application):
    print("setup adminUserSeededFixture fixture")

    with application.app_context():
        database.session.add(
                UserFactory(
                    name='admin',
                    email='admin@admin.com',
                    password='admin',
                    roles=[RoleFactory(name='admin')])
                )

        users = database.session.query(User).all()
        utils.printObject(users)

        database.session.commit()

    yield None
    print("teardown adminUserSeededFixture fixture")


@pytest.fixture
def authedClient(client, usersSeededFixture):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    rv = client.post('/login', 'http://localhost', json={
        'email': 'test@test.com',
        'password': 'test'
        }, headers=headers)

    tokenDict = {}

    for header in rv.headers:
        if header[0] == 'Set-Cookie':
            token = header[1].replace(";", "=").split("=")
            tokenDict[token[0]] = token[1]

    utils.printObject(tokenDict)

    # IMPORTANT NOTE
    # content should just access_token itself. DO NOT include any other info such as path, httpOnly
    client.set_cookie('localhost', 'access_token_cookie', tokenDict['access_token_cookie'])
    client.set_cookie('localhost', 'refresh_token_cookie', tokenDict['refresh_token_cookie'])
    client.set_cookie('localhost', 'csrf_access_token', tokenDict['csrf_access_token'])
    client.set_cookie('localhost', 'csrf_refresh_token', tokenDict['csrf_refresh_token'])

    yield client


@pytest.fixture
def authedAdminClient(client, adminUserSeededFixture):

    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    rv = client.post('/login', 'http://localhost', json={
        'email': 'admin@admin.com',
        'password': 'admin'
        }, headers=headers)

    tokenDict = {}

    for header in rv.headers:
        if header[0] == 'Set-Cookie':
            token = header[1].replace(";", "=").split("=")
            tokenDict[token[0]] = token[1]

    utils.printObject(tokenDict)

    # IMPORTANT NOTE
    # content should just access_token itself. DO NOT include any other info such as path, httpOnly
    client.set_cookie('localhost', 'access_token_cookie', tokenDict['access_token_cookie'])
    client.set_cookie('localhost', 'refresh_token_cookie', tokenDict['refresh_token_cookie'])
    client.set_cookie('localhost', 'csrf_access_token', tokenDict['csrf_access_token'])
    client.set_cookie('localhost', 'csrf_refresh_token', tokenDict['csrf_refresh_token'])

    yield client


@pytest.fixture
def authedClientWithBlogSeeded(application, database, authedClient):
    print("setup seedBlogsOfAuthedClient fixture")

    authedUser = None

    with application.app_context():
        authedUser = database.session.query(User).filter_by(email='test@test.com').first()
        database.session.add(BlogFactory(user=authedUser, userId=authedUser.id))
        database.session.add(BlogFactory(user=authedUser, userId=authedUser.id))
        database.session.add(BlogFactory(user=authedUser, userId=authedUser.id))
        database.session.commit()

    yield authedClient
    print("teardown seedBlogsOfAuthedClient fixture")


@pytest.fixture
def httpHeaders():
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype,
    }
    yield headers


@pytest.fixture
def multipartHttpHeaders():
    mimetype = 'multipart/form-data'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype,
    }
    yield headers


@pytest.fixture
def testImageFile():
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = 'test.png'
    file.seek(0)
    yield file


@pytest.fixture
def testNoImageFile():
    file = BytesIO()
    file.write('this is not image file'.encode('utf-8'))
    file.name = 'non-image-file.js'
    file.seek(0)
    yield file
