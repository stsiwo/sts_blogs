from Configs.extensions import ma
from Infrastructure.DataModels.RoleModel import Role


class RoleSchema(ma.ModelSchema):
    class Meta:
        model = Role
