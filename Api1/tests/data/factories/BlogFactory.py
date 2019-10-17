from Infrastructure.DataModels.BlogModel import Blog
import factory
from tests.data.factories.BaseFactory import BaseFactory
from tests.data.factories.UserFactory import UserFactory


class BlogFactory(BaseFactory):
    class Meta:
        model = Blog

    # if you need fixed fake values use faker.py instead of factory.Faker(...)
    id = factory.Sequence(lambda n: n+1)
    title = factory.Faker('sentence')
    content = factory.Faker('sentence')
    user = UserFactory()
    userId = user.id
