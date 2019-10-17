from tests.data.testUserWithMemberRoleSeeder import testUserWithMemberRoleSeeder
import pytest
import utils
from tests.data.factories.BlogFactory import BlogFactory
from tests.data.factories.RoleFactory import RoleFactory
from tests.data.factories.UserFactory import UserFactory
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.UserModel import User


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

        blogs = database.session.query(Blog).all()
        utils.printObject(blogs)

    yield None
    print("teardown blogsSeededFixture fixture")


@pytest.fixture
def rolesSeededFixture(database, application):
    print("setup blogsSeededFixture fixture")

    with application.app_context():
        database.session.add(RoleFactory(name='admin'))
        database.session.add(RoleFactory(name='member'))

        roles = database.session.query(Role).all()
        utils.printObject(roles)

    yield None
    print("teardown blogsSeededFixture fixture")


@pytest.fixture
def usersSeededFixture(database, application):
    print("setup blogsSeededFixture fixture")

    with application.app_context():
        database.session.add(UserFactory())

        users = database.session.query(User).all()
        utils.printObject(users)

    yield None
    print("teardown blogsSeededFixture fixture")
