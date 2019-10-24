from Infrastructure.repositories.UserRepository import UserRepository
from Infrastructure.DataModels.UserModel import User
from utils.util import printObject


def test_ur1_get_all(usersSeededFixture):

    userRepo = UserRepository()

    users = userRepo.getAll()

    assert len(users) != 0


def test_ur2_get(usersSeededFixture):

    userRepo = UserRepository()

    user = userRepo.get(2)

    assert user.id == 2


def test_ur3_getByEmail(usersSeededFixture):

    userRepo = UserRepository()

    user = userRepo.getByEmail('test@test.com')

    assert user.id == 2


def test_ur4_create(exSession):

    userRepo = UserRepository()

    userRepo.create(
            name="new_user",
            email="new@new.com",
            password="password"
            )
    exSession.commit()

    newlyCreatedUser = userRepo.getByEmail("new@new.com")

    assert newlyCreatedUser.name == 'new_user'
    assert 'member' in [role.name for role in newlyCreatedUser.roles]


def test_ur5_updateByObject(exSession, usersSeededFixture):

    user = usersSeededFixture

    userRepo = UserRepository()

    userRepo.updateByObject(user, name='updated_name', email='updated@email.com', password='updated', avatarUrl='updatedUrl')

    exSession.commit()

    updatedUser = userRepo.get(user.id)

    assert updatedUser.name == 'updated_name'
    assert updatedUser.email == 'updated@email.com'
    updatedUser.hashPassword('updated')
    assert updatedUser.verifyPassword('updated') is True
    assert updatedUser.avatarUrl == 'updatedUrl'


def test_ur6_updateById(exSession, usersSeededFixture):

    user = usersSeededFixture

    userRepo = UserRepository()

    userRepo.updateById(user.id, name='updated_name')

    exSession.commit()

    updatedUser = userRepo.get(user.id)

    assert updatedUser.name == 'updated_name'
    assert updatedUser.email == 'test@test.com'


def test_ur7_updateByEmail(exSession, usersSeededFixture):

    user = usersSeededFixture

    userRepo = UserRepository()

    userRepo.updateByEmail(user.email, name='updated_name')

    exSession.commit()

    updatedUser = userRepo.get(user.id)

    assert updatedUser.name == 'updated_name'
    assert updatedUser.email == 'test@test.com'


def test_ur8_delete(exSession, usersSeededFixture):

    user = usersSeededFixture

    userRepo = UserRepository()

    userRepo.delete(user.id)

    exSession.commit()

    deletedUser = userRepo.get(user.id)

    assert deletedUser is None


def test_ur9_deleteByEmail(exSession, usersSeededFixture):

    user = usersSeededFixture

    userRepo = UserRepository()

    userRepo.deleteByEmail(user.email)

    exSession.commit()

    deletedUser = userRepo.get(user.id)

    assert deletedUser is None
