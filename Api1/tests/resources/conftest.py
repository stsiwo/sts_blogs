from tests.data.testUserWithMemberRoleSeeder import testUserWithMemberRoleSeeder
import pytest


# fixture for test_login
@pytest.fixture
def testUserWithMemberRoleFixture(database, application):

    with application.app_context():
        testUserWithMemberRoleSeeder(database)

    yield None
