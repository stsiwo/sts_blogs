from Infrastructure.repositories.RoleRepository import RoleRepository


def test_tr1_get_all():

    roleRepo = RoleRepository()

    roles = roleRepo.getAll()

    assert len(roles) != 0


def test_tr2_get():

    roleRepo = RoleRepository()

    role = roleRepo.get('member')

    assert role.name == 'member'


def test_tr3_get():

    roleRepo = RoleRepository()

    role = roleRepo.get('member')

    assert role.name == 'member'


def test_tr4_delete(exSession):

    roleRepo = RoleRepository()

    roleRepo.delete('member')
    exSession.commit()

    assert roleRepo.get('member') is None


def test_tr5_delete_should_not_throw_exception(exSession):

    roleRepo = RoleRepository()

    roleRepo.delete('role_not_exist')
    exSession.commit()

    assert roleRepo.get('role_not_exist') is None
