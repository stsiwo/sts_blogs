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
