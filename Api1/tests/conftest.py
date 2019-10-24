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
from tests.data.generators.UserGenerator import generateUserModel

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

    tags = database.session.query(Role).all()
    printObject(tags)

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
