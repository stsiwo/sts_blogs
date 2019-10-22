from Configs.extensions import ma
from Infrastructure.DataModels.CommentModel import Comment
from marshmallow_sqlalchemy.fields import Nested


class CommentSchema(ma.ModelSchema):
    class Meta:
        model = Comment
