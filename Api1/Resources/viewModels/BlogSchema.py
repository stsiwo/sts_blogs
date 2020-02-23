from Configs.extensions import ma
from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from marshmallow import fields
from Resources.viewModels.TagSchema import TagSchema
import urllib.parse


class BlogSchema(ma.ModelSchema):
    class Meta:
        model = Blog
        exclude = ['user', 'blogImages']

    # use this because i don't know how to rename 'user' -> 'author' using Nested function
    author = fields.Method('author_assignment')

    def author_assignment(self, obj):
        author = {
            'id': obj.user.id,
            'name': obj.user.name,
                }
        if obj.user.avatarUrl is not None:
            author['avatarUrl'] = urllib.parse.urljoin(app.config['HOST_NAME'], obj.user.avatarUrl)
        return author

    mainImageUrl = fields.Function(lambda obj: urllib.parse.urljoin(app.config['HOST_NAME'], obj.mainImageUrl) if obj.mainImageUrl is not None else None)
    # blogImagePaths = fields.Method('translate_to_blog_image_paths')
    tags = fields.Pluck(TagSchema, 'name', many=True)

    # def translate_to_blog_image_paths(self, obj):
    #     if obj.blogImages is not None:
    #         return [blogImage.path for blogImage in obj.blogImages]
    #     else:
    #         return None
