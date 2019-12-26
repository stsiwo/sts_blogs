import os
import tempfile
import pytest
from Configs.appConfig import main
from Configs.extensions import db
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from utils.util import printObject
from tests.data.generators.RoleGenerator import generateRoleModel
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.TagModel import Tag
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.BlogImageModel import BlogImage
from tests.data.generators.UserGenerator import generateUserModel
from tests.data.generators.BlogGenerator import generateBlogModel
from tests.data.generators.CommentGenerator import generateCommentModel
from io import BytesIO
from PIL import Image
import shutil
from utils.forgotPasswordToken import generateForgotPasswordToken
from Configs.settings import FORGOT_PASSWORD_TOKEN_EXPIRY
from exceptions.EmailServiceException import EmailServiceException
from application.EmailService import EmailClient
from utils.util import parseStrToDate
import pathlib
from werkzeug.datastructures import FileStorage
import time
import uuid

app = main

###
# database setup: use flask migration and command to setup initial database and data
###


@pytest.fixture
def testImageFile():
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = str(uuid.uuid4()) + '.png'
    file.seek(0)
    yield file


@pytest.fixture
def testNoImageFile():
    file = BytesIO()
    file.write('this is not image file'.encode('utf-8'))
    file.name = str(uuid.uuid4()) + '.png'
    file.seek(0)
    yield file


@pytest.fixture
def testExistingFileStorage():
    print('start setup test exisitng file storage')
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = str(uuid.uuid4()) + '.png'
    file.seek(0)
    fileStorage: FileStorage = FileStorage(stream=file, content_type='image/png')
    print(fileStorage)
    yield fileStorage


@pytest.fixture
def testExistingFileStorage1():
    print('start setup test exisitng file storage')
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = str(uuid.uuid4()) + '.png'
    file.seek(0)
    fileStorage: FileStorage = FileStorage(stream=file, content_type='image/png')
    print(fileStorage)
    yield fileStorage


@pytest.fixture
def testExistingFileStorage2():
    print('start setup test exisitng file storage')
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = str(uuid.uuid4()) + '.png'
    file.seek(0)
    fileStorage: FileStorage = FileStorage(stream=file, content_type='image/png')
    print(fileStorage)
    yield fileStorage


@pytest.fixture
def testFileStorage():
    print('start setup test exisitng file storage')
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = str(uuid.uuid4()) + '.png'
    file.seek(0)
    fileStorage: FileStorage = FileStorage(stream=file, content_type='image/png')
    print(fileStorage)
    yield fileStorage


@pytest.fixture
def testFileStorage1():
    print('start setup test exisitng file storage 1')
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = str(uuid.uuid4()) + '.png'
    file.seek(0)
    fileStorage: FileStorage = FileStorage(stream=file, content_type='image/png')
    print(fileStorage)
    yield fileStorage


@pytest.fixture
def testFileStorage2():
    print('start setup test exisitng file storage 2')
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = str(uuid.uuid4()) + '.png'
    file.seek(0)
    fileStorage: FileStorage = FileStorage(stream=file, content_type='image/png')
    print(fileStorage)
    yield fileStorage


@pytest.fixture
def testFileStorage3():
    print('start setup test exisitng file storage 3')
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = str(uuid.uuid4()) + '.png'
    file.seek(0)
    fileStorage: FileStorage = FileStorage(stream=file, content_type='image/png')
    print(fileStorage)
    yield fileStorage


@pytest.fixture(scope="session")
def application():
    print('setup application fixture ...')
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    # RuntimeError: Session backend did not open a session. Check the configuration
    # app.config['TESTING'] = True  move to .env.testing
    # need to set secret key
    # app.config['SECRET_KEY'] = 'sekrit!'
    # app.config['SQLALCHEMY_ECHO'] = True
    # app.config['UPLOAD_FOLDER'] = 'temp/uploads'

    yield app

    print('teardown application fixture ...')
    os.close(db_fd)
    os.unlink(app.config['DATABASE'])


# use addfinalizer to execute teardown code even when exception is thrown
@pytest.fixture(scope="session")
def database(application, request):
    print('setup database fixture ...')

    db.app = application

    def fin():
        print("teardown database ...")

    request.addfinalizer(fin)
    return db


def clear_data(db):
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        if table != 'roles':
            print('Clear table %s' % table)
            db.session.execute(table.delete())
    db.session.commit()


@pytest.fixture
def setupTempUploadDir(application, request):
    print('start creating temp directory for test files')

    # for upload image directory
    pathlib.Path(os.path.join(application.config['UPLOAD_FOLDER'])).mkdir(parents=True, exist_ok=True)

    printObject(os.listdir('.'))

    def fin():
        shutil.rmtree('temp')

    request.addfinalizer(fin)
    return None


@pytest.fixture
def setupTempUploadDirWithImageFile(application, setupTempUploadDir, authedClientWithBlogSeeded, exSession, testExistingFileStorage, testExistingFileStorage1, testExistingFileStorage2):

    authedUser = exSession.query(User).filter_by(email='test@test.com').first()
    imgDir = os.path.join(application.config['UPLOAD_FOLDER'], str(authedUser.id))
    pathlib.Path(imgDir).mkdir(parents=True, exist_ok=True)
    # save testing file
    testExistingFileStorage.save(os.path.join(imgDir, testExistingFileStorage.filename))
    testExistingFileStorage1.save(os.path.join(imgDir, testExistingFileStorage1.filename))
    testExistingFileStorage2.save(os.path.join(imgDir, testExistingFileStorage2.filename))

    printObject(os.listdir(application.config['UPLOAD_FOLDER']))

    yield None


@pytest.fixture
def setupTempUploadDirWithTestImageFile(application, setupTempUploadDir):

    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(os.path.join(application.config['UPLOAD_FOLDER'], 'existing_test.png'))

    printObject(os.listdir(application.config['UPLOAD_FOLDER']))

    yield None


@pytest.fixture(autouse=True)
def exSession(database, request, application):
    """ flask-sqla session connected to external transaction
        purpose: to rollback test-func-specific seeded data and any commit involved in the test func
        refs:
            - https://docs.sqlalchemy.org/en/11/orm/session_transaction.html#joining-a-session-into-an-external-transaction-such-as-for-test-suites
            - https://github.com/pallets/flask-sqlalchemy/pull/249
        """
    print("setting up joining session to external transaction fixture ...")
    engine = create_engine(application.config.get('SQLALCHEMY_DATABASE_URI'))
    connection = engine.connect()
    transaction = connection.begin()
    options = dict(bind=connection, binds={})
    session = database.create_scoped_session(options=options)
    originalSession = database.session
    database.session = session

    def fin():
        print("teardown joining session to external transaction fixture  ...")
        transaction.rollback()
        connection.close()
        database.session = originalSession

    request.addfinalizer(fin)
    return database.session


@pytest.fixture
def usersSeededFixture(application, exSession, testExistingFileStorage):
    print("setup usersSeededFixture fixture")

    memberRole = exSession.query(Role).filter_by(name='member').first()
    memberUser = generateUserModel(
            id=2,
            name='test',
            email='test@test.com',
            password='test',
            avatarUrl=os.path.join(application.config['PUBLIC_FILE_FOLDER'], str(2), testExistingFileStorage.filename),
            roles=[memberRole]
            )

    exSession.add(memberUser)

    exSession.commit()

    yield memberUser
    print("teardown usersSeededFixture fixture")


@pytest.fixture
def blogsSeededFixture(exSession, usersSeededFixture):
    print("setup blogsSeededFixture fixture")

    memberUser = usersSeededFixture

    jsTag = exSession.query(Tag).filter(Tag.name == 'js').first()
    webpackTag = exSession.query(Tag).filter(Tag.name == 'webpack').first()
    reactTag = exSession.query(Tag).filter(Tag.name == 'react').first()

    blogs = [
            generateBlogModel(id=1, userId=memberUser.id, user=memberUser, tags=[jsTag], content="sample", createdDate=parseStrToDate('1999-01-01T00:00:00.000Z')),
            generateBlogModel(id=2, userId=memberUser.id, user=memberUser, tags=[jsTag, webpackTag], subtitle="sample", createdDate=parseStrToDate('2000-01-01T00:00:00.000Z')),
            generateBlogModel(id=3, userId=memberUser.id, user=memberUser, tags=[jsTag, reactTag], createdDate=parseStrToDate('2001-01-01T00:00:00.000Z')),
            generateBlogModel(id=4, userId=memberUser.id, user=memberUser, tags=[jsTag], title="sample", createdDate=parseStrToDate('2002-01-01T00:00:00.000Z')),
            generateBlogModel(id=5, userId=memberUser.id, user=memberUser, tags=[jsTag, webpackTag], createdDate=parseStrToDate('2003-01-01T00:00:00.000Z')),
            generateBlogModel(id=6, userId=memberUser.id, user=memberUser, tags=[jsTag, reactTag], createdDate=parseStrToDate('2004-01-01T00:00:00.000Z'))
            ]

    for blog in blogs:
        exSession.add(blog)

    exSession.commit()
    yield blogs
    print("teardown blogsSeededFixture fixture")


@pytest.fixture
def client(application):
    print('setup client fixture ...')
    yield application.test_client()
    print('teardown client fixture ...')


@pytest.fixture
def session(application):
    print("setup session fixture")
    # enable echo executed query statement
    # engine = create_engine('sqlite:////tmp/api1.db', echo=True)
    engine = create_engine(application.config.get('SQLALCHEMY_DATABASE_URI'))
    session = scoped_session(sessionmaker(bind=engine))
    yield session
    session.rollback()
    print("teardown session fixture")


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
def authedClientForTokenTest(application, client, usersSeededFixture):

    def get(access_token_expiry: int = 1, refresh_token_expiry: int = 1):

        # set exipred access token (AT) and no expired refresh token (RT)
        application.config['JWT_ACCESS_TOKEN_EXPIRES'] = access_token_expiry
        application.config['JWT_REFRESH_TOKEN_EXPIRES'] = refresh_token_expiry

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

        print('*** extracted access & refresh & its csrf token')
        printObject(tokenDict)

        # IMPORTANT NOTE
        # content should just access_token itself. DO NOT include any other info such as path, httpOnly
        client.set_cookie('localhost', 'access_token_cookie', tokenDict['access_token_cookie'])
        client.set_cookie('localhost', 'refresh_token_cookie', tokenDict['refresh_token_cookie'])
        client.set_cookie('localhost', 'csrf_access_token', tokenDict['csrf_access_token'])
        client.set_cookie('localhost', 'csrf_refresh_token', tokenDict['csrf_refresh_token'])

        print('*** csrf_access_token: {}'.format(tokenDict['csrf_access_token']))

        # NOTE: wait access token to be expired
        #   - value must match with JWT_ACCESS_TOKEN_EXPIRES value in above
        #   - value '1' does not work
        #   - value '2' does work!!! the value should be expiry time + 1 sec
        print('*** wait access token is expired')
        time.sleep(2)

        def teardown():
            # remove tokens for clean up
            print('*** start remove token of authedClientWithExpiredATAndNoExpiredRT client')
            client.post('/token/remove', headers={
                'X-CSRF-TOKEN': tokenDict['csrf_access_token']
                })

        client.teardown = teardown

        return client

    yield get
    print('*** teardown authedClientWithExpiredATAndNoExpiredRT fixture')


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
def authedClientWithBlogSeeded(exSession, authedClient, testExistingFileStorage, testExistingFileStorage1, testExistingFileStorage2):
    print("setup seedBlogsOfAuthedClient fixture")

    authedUser = exSession.query(User).filter_by(email='test@test.com').first()
    exSession.add(generateBlogModel(
        id=1,
        user=authedUser,
        userId=authedUser.id,
        mainImageUrl='/images/' + str(authedUser.id) + '/' + testExistingFileStorage.filename,
        blogImages=[
            BlogImage(path='/images/' + str(authedUser.id) + '/' + testExistingFileStorage1.filename),
            BlogImage(path='/images/' + str(authedUser.id) + '/' + testExistingFileStorage2.filename),
            ]
        ))
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
def patchedYgmailSendFunc(mocker):
    mocked_yag_send = mocker.patch.object(EmailClient, 'send')
    yield mocked_yag_send


@pytest.fixture
def patchedYgmailSendFuncWithThrowException(mocker):
    mocked_yag_send = mocker.patch.object(EmailClient, 'send', side_effect=EmailServiceException())
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


@pytest.fixture
def testBlogData():
    yield {
            'title': "test-title",
            'subtitle': "test-subtitle",
            'content': "test-content",
            'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
            }


@pytest.fixture
def testNewBlogData():
    yield {
            'title': "test-title",
            'subtitle': "test-subtitle",
            'content': "test-content",
            'createdDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
            }


@pytest.fixture
def testBlogDataWithMainImage(testImageFile):
    yield {
            'title': "test-title",
            'subtitle': "test-subtitle",
            'content': "test-content",
            'mainImage': testImageFile,
            'updatedDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
            }


@pytest.fixture
def testNewBlogDataWithMainImage(testFileStorage):
    yield {
            'title': "test-title",
            'subtitle': "test-subtitle",
            'content': "test-content",
            'mainImage': testFileStorage,
            'createdDate': parseStrToDate('1999-01-01T00:00:00.000Z'),
            }


@pytest.fixture
def testUserDataForUpdate():
    yield {
            'name': 'updated_name',
            'email': 'updated@test.com',
            'password': 'updated_password',
            }


@pytest.fixture
def testUserDataWithImageForUpdate(testFileStorage):
    yield {
            'name': 'updated_name',
            'email': 'updated@test.com',
            'password': 'updated_password',
            'avatarFile': testFileStorage.stream
            }
