from Infrastructure.DataModels.RoleModel import Role
import factory
from tests.data.factories.BaseFactory import BaseFactory


class RoleFactory(BaseFactory):
    class Meta:
        model = Role

    id = factory.Sequence(lambda n: n+1)
    name = factory.Faker('name')
