from Infrastructure.DataModels.RoleModel import Role
import factory


class RoleFactory(factory.Factory):
    class Meta:
        model = Role

    name = factory.Faker('name')
