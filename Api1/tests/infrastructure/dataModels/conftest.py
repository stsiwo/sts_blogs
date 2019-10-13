import factory
from Infrastructure.DataModels.TestModel import Test
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
import pytest


@pytest.fixture
def TestFactory(session):

    class TestFactory(factory.alchemy.SQLAlchemyModelFactory):
        class Meta:
            model = Test
            sqlalchemy_session = session   # the SQLAlchemy session object

        name = "satoshi"

    yield TestFactory


@pytest.fixture
def UserFactory(session):

    class UserFactory(factory.alchemy.SQLAlchemyModelFactory):
        class Meta:
            model = User
            sqlalchemy_session = session   # the SQLAlchemy session object

        name = "satoshi"
        email = "test@test.com"
        password = "password"
        avatarUrl = "avatarUrl"

        # code in docs does not work in the case of SQLAlchemy
        # so, i modified it
        # code in docs is following:

        #    @factory.post_generation
        #    def groups(self, create, extracted, **kwargs):
        #        if not create:
        #            # Simple build, do nothing.
        #            return

        #        if extracted:
        #            # A list of groups were passed in, use them
        #            for group in extracted:
        #                self.groups.add(group)

        @factory.post_generation
        def roles(self, create, extracted, **kwargs):
            if not create:
                # Simple build, do nothing.
                return

            if extracted:
                # A list of groups were passed in, use them
                print(extracted)
                for role in extracted:
                    self.roles.append(role)

    yield UserFactory


@pytest.fixture
def RoleFactory(session):

    class RoleFactory(factory.alchemy.SQLAlchemyModelFactory):
        class Meta:
            model = Role
            sqlalchemy_session = session   # the SQLAlchemy session object

        name = "role-sample"

    yield RoleFactory
