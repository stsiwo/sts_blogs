from Infrastructure.repositories.BaseRepository import BaseRepository
from Infrastructure.DataModels.TagModel import Tag
from utils.util import printObject


def test_get_all_tag_model():
    baseRepo = BaseRepository[Tag]()

    printObject(baseRepo)

    tags = baseRepo.getAll()

    printObject(tags)
    assert len(tags) != 0
