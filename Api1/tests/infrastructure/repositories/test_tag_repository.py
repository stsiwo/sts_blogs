from Infrastructure.repositories.TagRepository import TagRepository
from Infrastructure.DataModels.TagModel import Tag
from utils.util import printObject

# TagRepository testing
# tr1: getAll() test
# tr2: get(name) test
# tr3: get(name) test with lower and no whitespace
# tr4: create() test with lower and no whitespace
# tr5: create() test should not to save a tag when the tag name already exist
# tr6: isExist() test for True
# tr7: isExist() tes for False


def test_tr1_get_all():

    tagRepo = TagRepository()

    tags = tagRepo.getAll()

    assert len(tags) != 0


def test_tr2_get():

    tagRepo = TagRepository()

    tag = tagRepo.get('js')

    assert tag.name == 'js'


def test_tr3_get():

    tagRepo = TagRepository()

    tag = tagRepo.get(' jS ')

    assert tag.name == 'js'


def test_tr4_create(exSession):

    tagRepo = TagRepository()

    tagRepo.create('newTag')
    exSession.commit()

    newlyCreatedTag = tagRepo.get('newTag')

    assert newlyCreatedTag.name == 'newtag'


# use mocker.MagicMock for session.add to make sure it is not called
def test_tr5_create_should_not_save_a_tag_if_it_already_exist(exSession, mocker):

    tagRepo = TagRepository()
    tagRepo._session.add = mocker.MagicMock()

    tagRepo.create('js')
    exSession.commit()

    assert not tagRepo._session.add.called


def test_tr6_isExist_should_return_true():

    tagRepo = TagRepository()

    assert tagRepo.isExist('js') is True


def test_tr7_isExist_should_return_false():

    tagRepo = TagRepository()

    assert tagRepo.isExist('not_exisitng_tag') is False
