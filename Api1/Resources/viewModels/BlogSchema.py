from Configs.extensions import ma
from Infrastructure.DataModels.BlogModel import Blog
from marshmallow_sqlalchemy.fields import Nested
from Resources.viewModels.UserSchema import UserSchema


class BlogSchema(ma.ModelSchema):
    class Meta:
        model = Blog

    user = Nested(UserSchema)
