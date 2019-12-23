from Configs.extensions import ma
from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from marshmallow import fields
from Resources.viewModels.TagSchema import TagSchema
import urllib.parse


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

    mainImageUrl = fields.Function(lambda obj: urllib.parse.urljoin(app.config['HOST_NAME'], obj.mainImageUrl) if obj.mainImageUrl is not None else None)
    tags = fields.Pluck(TagSchema, 'name', many=True)
