from Configs.extensions import ma
from Infrastructure.DataModels.BlogModel import Blog
from marshmallow_sqlalchemy.fields import Nested
from marshmallow import fields
from Resources.viewModels.UserSchema import UserSchema


class BlogSchema(ma.ModelSchema):
    class Meta:
        model = Blog
        exclude = ['user']

    # use this because i don't know how to rename 'user' -> 'author' using Nested function
    author = fields.Function(lambda blog: {
        'id': blog.user.id,
        'name': blog.user.name,
        'avatarUrl': blog.user.avatarUrl,
        })
