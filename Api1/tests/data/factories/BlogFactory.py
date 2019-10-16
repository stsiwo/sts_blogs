from Infrastructure.DataModels.BlogModel import Blog
from tests.data.factories.UserFactory import UserFactory
import factory


class BlogFactory(factory.Factory):
    class Meta:
        model = Blog

    # if you need fixed fake values use faker.py instead of factory.Faker(...)
    id = factory.Sequence(lambda n: n)
    title = factory.Faker('sentence')
    content = factory.Faker('sentence')
    user = UserFactory()
    userId = user.id
