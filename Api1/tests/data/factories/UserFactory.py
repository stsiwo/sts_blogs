from Infrastructure.DataModels.UserModel import User
from tests.data.factories.RoleFactory import RoleFactory
import factory


class UserFactory(factory.Factory):
    class Meta:
        model = User

    id = factory.Sequence(lambda n: n)
    name = factory.Faker('name')
    email = factory.Faker('email')
    password = factory.Faker('password')
    avatarUrl = factory.Faker('url')
    roles = [RoleFactory(name='member')]
