from tests.data.testUserWithMemberRoleSeeder import testUserWithMemberRoleSeeder
from tests.data.blogsSeeder import blogsSeed
import pytest


# fixture for test_login
@pytest.fixture
def testUserWithMemberRoleFixture(database, application):

    with application.app_context():
        testUserWithMemberRoleSeeder(database)

    yield None


@pytest.fixture
def blogsSeededFixture(database, application):

    with application.app_context():
        blogsSeed(database)

    yield None
