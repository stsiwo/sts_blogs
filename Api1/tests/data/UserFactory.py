from Infrastructure.DataModels.UserModel import User
import factory


class UserFactory(factory.Factory):
    class Meta:
        model = User

    name = factory.Faker('name')
    email = factory.Faker('email')
    password = factory.Faker('password')
    avatarUrl = factory.Faker('url')
