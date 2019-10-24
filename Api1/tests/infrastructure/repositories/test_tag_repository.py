from Infrastructure.repositories.TagRepository import TagRepository

# TagRepository testing
# tr1: getAll() test
# tr2: get(name) test
# tr3: get(name) test with lower and no whitespace
# tr4: createIfNotExit() test with lower and no whitespace
# tr5: createifNotExit() test should not to save a tag when the tag name already exist
# tr6: delete() test by name
# tr6: delete() test should not throw exception when tag name does not exist


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


def test_tr4_createIfNotExit_should_create_new_tag(exSession):

    tagRepo = TagRepository()

    tagRepo.createIfNotExist('newTag')
    exSession.commit()

    newTag = tagRepo.get('newTag')

    assert newTag.name == 'newtag'


def test_tr5_createIfNotExit_should_not_create_a_tag_since_it_already_exists(exSession, mocker):

    tagRepo = TagRepository()
    tagRepo.add = mocker.MagicMock()

    tagRepo.createIfNotExist(' jS ')
    exSession.commit()

    # make sure add function inside if statement is not called when tag exists
    assert not tagRepo.add.called


def test_tr6_delete(exSession):

    tagRepo = TagRepository()

    tagRepo.delete('js')
    exSession.commit()

    assert tagRepo.get('js') is None


def test_tr7_delete_should_not_throw_exception(exSession):

    tagRepo = TagRepository()

    tagRepo.delete('tag_not_exist')
    exSession.commit()

    assert tagRepo.get('tag_not_exist') is None
