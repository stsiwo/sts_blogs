from Infrastructure.DataModels.UserModel import User
import factory
from tests.data.factories.BaseFactory import BaseFactory
from tests.data.factories.RoleFactory import RoleFactory


class UserFactory(BaseFactory):
    class Meta:
        model = User

    id = factory.Sequence(lambda n: n+1)
    name = factory.Faker('name')
    email = factory.Faker('email')
    password = factory.Faker('password')
    avatarUrl = factory.Faker('url')
    roles = [RoleFactory(name='member')]
