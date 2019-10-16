from Infrastructure.DataModels.RoleModel import Role
import factory


class RoleFactory(factory.Factory):
    class Meta:
        model = Role

    id = factory.Sequence(lambda n: n)
    name = factory.Faker('name')
