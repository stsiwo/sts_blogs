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
from tests.data.generators.UserGenerator import generateUserModel
from tests.data.generators.BlogGenerator import generateBlogModel
from tests.data.generators.CommentGenerator import generateCommentModel
from io import BytesIO
from PIL import Image
import shutil
from utils.forgotPasswordToken import generateForgotPasswordToken
from Configs.settings import FORGOT_PASSWORD_TOKEN_EXPIRY
from exceptions.EmailServiceException import EmailServiceException
from application.EmailService import EmailService
import random

app = main


@pytest.fixture(scope="session")
def application():
    print('setup application fixture ...')
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    # RuntimeError: Session backend did not open a session. Check the configuration
    # need to set secret key
    app.config['SECRET_KEY'] = 'sekrit!'
    app.config['SQLALCHEMY_ECHO'] = True

    yield app

    print('teardown application fixture ...')
    os.close(db_fd)
    os.unlink(app.config['DATABASE'])


# use addfinalizer to execute teardown code even when exception is thrown
@pytest.fixture(scope="session")
def database(application, request):
    print('setup database fixture ...')

    application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/api1-test.db'
    db.app = application

    db.create_all()

    def fin():
        print("teardown database ...")
        clear_data(db)

    request.addfinalizer(fin)
    return db


def clear_data(db):
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        if table != 'roles':
            print('Clear table %s' % table)
            db.session.execute(table.delete())
    db.session.commit()


@pytest.fixture(scope="session", autouse=True)
def rolesSeededFixture(database, application):
    print("setup rolesSeededFixture fixture")

    database.session.add(generateRoleModel(name='admin'))
    database.session.add(generateRoleModel(name='member'))

    database.session.commit()

    roles = database.session.query(Role).all()
    printObject(roles)

    yield None
    print("teardown rolesSeededFixture fixture")


@pytest.fixture(scope="session", autouse=True)
def tagsSeededFixture(database, application):
    print("setup tagsSeededFixture fixture")

    database.session.bulk_save_objects(
                [
                    Tag(name='ui'),
                    Tag(name='frontend'),
                    Tag(name='backend'),
                    Tag(name='css'),
                    Tag(name='sql'),
                    Tag(name='python'),
                    Tag(name='typscript'),
                    Tag(name='react'),
                    Tag(name='angular'),
                    Tag(name='sqlalchemy'),
                    Tag(name='php'),
                    Tag(name='laravel'),
                    Tag(name='flask'),
                    Tag(name='django'),
                    Tag(name='oop'),
                    Tag(name='designpattern'),
                    Tag(name='nodejs'),
                    Tag(name='csharp'),
                    Tag(name='autofac'),
                    Tag(name='unittesting'),
                    Tag(name='mock'),
                    Tag(name='pytest'),
                    Tag(name='webpack'),
                    Tag(name='js')
                ]
            )

    database.session.commit()

    yield None
    print("teardown tagsSeededFixture fixture")


@pytest.fixture(autouse=True)
def exSession(database, request):
    """ flask-sqla session connected to external transaction
        purpose: to rollback test-func-specific seeded data and any commit involved in the test func
        refs:
            - https://docs.sqlalchemy.org/en/11/orm/session_transaction.html#joining-a-session-into-an-external-transaction-such-as-for-test-suites
            - https://github.com/pallets/flask-sqlalchemy/pull/249
        """
    print("setting up joining session to external transaction fixture ...")
    engine = create_engine('sqlite:////tmp/api1-test.db')
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
def blogsSeededFixture(exSession, usersSeededFixture, tagsSeededFixture):
    print("setup blogsSeededFixture fixture")

    memberUser = usersSeededFixture

    jsTag = exSession.query(Tag).filter(Tag.name == 'js').first()
    webpackTag = exSession.query(Tag).filter(Tag.name == 'webpack').first()
    reactTag = exSession.query(Tag).filter(Tag.name == 'react').first()

    blogs = [
            generateBlogModel(id=1, userId=memberUser.id, user=memberUser, tags=[jsTag], content="sample"),
            generateBlogModel(id=2, userId=memberUser.id, user=memberUser, tags=[jsTag, webpackTag], subtitle="sample"),
            generateBlogModel(id=3, userId=memberUser.id, user=memberUser, tags=[jsTag, reactTag]),
            generateBlogModel(id=4, userId=memberUser.id, user=memberUser, tags=[jsTag], title="sample"),
            generateBlogModel(id=5, userId=memberUser.id, user=memberUser, tags=[jsTag, webpackTag]),
            generateBlogModel(id=6, userId=memberUser.id, user=memberUser, tags=[jsTag, reactTag])
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
def session():
    print("setup session fixture")
    # enable echo executed query statement
    # engine = create_engine('sqlite:////tmp/api1.db', echo=True)
    engine = create_engine('sqlite:////tmp/api1.db')
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
    mocked_yag_send = mocker.patch.object(EmailService._client, 'send')
    yield mocked_yag_send


@pytest.fixture
def patchedYgmailSendFuncWithThrowException(mocker):
    mocked_yag_send = mocker.patch.object(EmailService._client, 'send', side_effect=EmailServiceException())
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
