import factory
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.TagModel import Tag
import pytest
from faker import Faker

fake: Faker = Faker()
# keep test data consistent for every test
fake.seed(4321)


@pytest.fixture
def userRolePopulatedSession(session):
    print("setup userRolePopulatedSession fixture")
    # role data to session
    session.bulk_save_objects(
        [
            Role(name='admin'),
            Role(name='member')
        ])

    # test user to session
    memberRole = session.query(Role).filter_by(name='member').first()

    session.add(
            User(
                name=fake.name(),
                email=fake.email(),
                password=fake.password(),
                roles=[memberRole]
            ))
    yield session
    print("teardown userRolePopulatedSession fixture")


@pytest.fixture
def userRoleTagPopulatedSession(userRolePopulatedSession):
    print("setup userRoleTagPopulatedSession fixture")
    # role data to session
    userRolePopulatedSession.bulk_save_objects(
        [
            Tag(name='test_tag_1'),
            Tag(name='test_tag_2'),
            Tag(name='test_tag_3'),
        ])

    yield userRolePopulatedSession
    print("teardown userRoleTagPopulatedSession fixture")


@pytest.fixture
def userRoleTagCommentPopulatedSession(userRoleTagPopulatedSession):
    print("setup userRoleTagCommentPopulatedSession fixture")
    # comment to session
    user = userRoleTagPopulatedSession.query(User).first()

    tags = userRoleTagPopulatedSession.query(Tag).all()

    blog = Blog(
            title='test title',
            content='test content',
            # need to explicitly set relationship here, otherwise integrityError
            # ??
            userId = user.id,
            tags=tags
            )

    user.blogs.append(blog)

    userRoleTagPopulatedSession.add(user)

    yield userRoleTagPopulatedSession
    print("teardown userRoleTagCommentPopulatedSession fixture")


@pytest.fixture
def UserFactory(session):

    class UserFactory(factory.alchemy.SQLAlchemyModelFactory):
        class Meta:
            model = User
            sqlalchemy_session = session   # the SQLAlchemy session object

        name = factory.Faker('name')
        email = factory.Faker('email')
        password = factory.Faker('password')
        avatarUrl = factory.Faker('url')

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


@pytest.fixture
def BlogFactory(session, UserFactory):

    class BlogFactory(factory.alchemy.SQLAlchemyModelFactory):
        class Meta:
            model = Blog
            sqlalchemy_session = session   # the SQLAlchemy session object

        title = factory.Faker('sentence', nb_words=4)
        content = factory.Faker('sentence')
        userId = -1

    yield BlogFactory
