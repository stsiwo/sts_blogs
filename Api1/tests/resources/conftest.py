import pytest
from utils.util import printObject
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.UserModel import User
from io import BytesIO
from PIL import Image
import os
import shutil
from tests.data.generators.UserGenerator import generateUserModel
from tests.data.generators.BlogGenerator import generateBlogModel
from tests.data.generators.CommentGenerator import generateCommentModel
from exceptions.EmailServiceException import EmailServiceException
from Configs.ygmailConfig import yag
from Configs.app import app
from utils.forgotPasswordToken import generateForgotPasswordToken
from Configs.settings import FORGOT_PASSWORD_TOKEN_EXPIRY


@pytest.fixture
def blogCommentsSeededFixture(exSession, blogsSeededFixture):
    print("setup blogCommentsSeededFixture fixture")

    blog = blogsSeededFixture[0]

    comments = [
            generateCommentModel(id=1, blogId=blog.id),
            generateCommentModel(id=2, blogId=blog.id),
            generateCommentModel(id=3, blogId=blog.id),
            ]

    for comment in comments:
        exSession.add(comment)

    exSession.commit()
    yield comments
    print("teardown blogCommentsSeededFixture fixture")


@pytest.fixture
def blogsSeededFixture(exSession, usersSeededFixture):
    print("setup blogsSeededFixture fixture")

    memberUser = usersSeededFixture

    blogs = [
            generateBlogModel(id=1, userId=memberUser.id, user=memberUser),
            generateBlogModel(id=2, userId=memberUser.id, user=memberUser),
            generateBlogModel(id=3, userId=memberUser.id, user=memberUser)
            ]

    for blog in blogs:
        exSession.add(blog)

    exSession.commit()
    yield blogs
    print("teardown blogsSeededFixture fixture")


@pytest.fixture
def usersSeededFixture(exSession):
    print("setup usersSeededFixture fixture")

    memberRole = exSession.query(Role).filter_by(name='member').first()
    memberUser = generateUserModel(
            id=2,
            name='test',
            email='test@test.com',
            password='test',
            roles=[memberRole]
            )

    exSession.add(memberUser)

    exSession.commit()

    yield memberUser
    print("teardown usersSeededFixture fixture")


@pytest.fixture
def adminUserSeededFixture(exSession):
    print("setup adminUserSeededFixture fixture")

    adminRole = exSession.query(Role).filter_by(name='admin').first()
    adminUser = generateUserModel(
        id=1,
        name='admin',
        email='admin@admin.com',
        password='admin',
        roles=[adminRole])

    exSession.add(adminUser)
    exSession.commit()

    yield adminUser
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

    printObject(tokenDict)

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

    printObject(tokenDict)

    # IMPORTANT NOTE
    # content should just access_token itself. DO NOT include any other info such as path, httpOnly
    client.set_cookie('localhost', 'access_token_cookie', tokenDict['access_token_cookie'])
    client.set_cookie('localhost', 'refresh_token_cookie', tokenDict['refresh_token_cookie'])
    client.set_cookie('localhost', 'csrf_access_token', tokenDict['csrf_access_token'])
    client.set_cookie('localhost', 'csrf_refresh_token', tokenDict['csrf_refresh_token'])

    yield client


@pytest.fixture
def authedClientWithBlogSeeded(exSession, authedClient):
    print("setup seedBlogsOfAuthedClient fixture")

    authedUser = exSession.query(User).filter_by(email='test@test.com').first()
    exSession.add(generateBlogModel(id=1, user=authedUser, userId=authedUser.id))
    exSession.add(generateBlogModel(id=2, user=authedUser, userId=authedUser.id))
    exSession.add(generateBlogModel(id=3, user=authedUser, userId=authedUser.id))
    exSession.commit()

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


uploadedFilePath = 'temp/uploads'


@pytest.fixture
def setupTempUploadDir(application, request):

    # for upload image directory
    application.config['UPLOAD_FOLDER'] = uploadedFilePath
    os.mkdir('temp')
    os.mkdir('temp/uploads')

    printObject(os.listdir('.'))

    def fin():
        shutil.rmtree('temp')

    request.addfinalizer(fin)
    return None


@pytest.fixture
def setupTempUploadDirWithTestImageFile(setupTempUploadDir):

    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(os.path.join(uploadedFilePath, 'existing_test.png'))

    printObject(os.listdir(uploadedFilePath))

    yield None


@pytest.fixture
def patchedYgmailSendFunc(mocker):
    mocked_yag_send = mocker.patch.object(yag, 'send')
    yield mocked_yag_send


@pytest.fixture
def expiredTokenGenerator():
    # use negative number for testing expiry
    # don't use '0' without time.sleep, itsdangerous does not recognize it
    app.config['FORGOT_PASSWORD_TOKEN_EXPIRY'] = -1

    def generateToken(userId: str):
        return generateForgotPasswordToken(userId)

    yield generateToken

    app.config['FORGOT_PASSWORD_TOKEN_EXPIRY'] = FORGOT_PASSWORD_TOKEN_EXPIRY
