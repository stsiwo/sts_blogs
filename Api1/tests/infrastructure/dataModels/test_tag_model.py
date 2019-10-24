from Infrastructure.DataModels.TagModel import Tag

# Tag(BaseModel)
# t1: sanitizeName static method


def test_t1_sanitizeName_staic_method():

    sanitizedName = Tag.sanitizeName(" jS ")

    assert sanitizedName == "js"
