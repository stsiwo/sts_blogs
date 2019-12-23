from Configs.extensions import ma
from Infrastructure.DataModels.TagModel import Tag


class TagSchema(ma.ModelSchema):
    class Meta:
        model = Tag
