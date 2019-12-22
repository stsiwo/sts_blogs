from Configs.extensions import ma
from Configs.app import app
from Infrastructure.DataModels.UserModel import User
from marshmallow_sqlalchemy.fields import Nested
from Resources.viewModels.RoleSchema import RoleSchema
from marshmallow import fields
import urllib.parse


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
        exclude = ['_password']

    roles = fields.Pluck(RoleSchema, 'name', many=True)
    # avatarUrl = urllib.parse.urljoin(app.config['HOST_NAME'], fields.String())
    avatarUrl = fields.Function(lambda obj: urllib.parse.urljoin(app.config['HOST_NAME'], obj.avatarUrl) if obj.avatarUrl is not None else None)
