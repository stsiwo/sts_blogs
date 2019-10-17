from Configs.extensions import ma
from Infrastructure.DataModels.UserModel import User
from marshmallow_sqlalchemy.fields import Nested
from Resources.viewModels.RoleSchema import RoleSchema


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User

    roles = Nested(RoleSchema, many=True)
