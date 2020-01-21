from Infrastructure.repositories.UserRepository import UserRepository
from Infrastructure.DataModels.UserModel import User
from utils.util import printObject


def test_ur1_get_all(usersSeededFixture):

    userRepo = UserRepository()

    users = userRepo.getAll()

    assert len(users) != 0


def test_ur2_get(usersSeededFixture):

    userInDB = usersSeededFixture

    userRepo = UserRepository()

    user = userRepo.get(userInDB.id)

    assert user.id == userInDB.id


def test_ur3_find(usersSeededFixture):

    userInDB = usersSeededFixture

    userRepo = UserRepository()

    user = userRepo.find(
            id=userInDB.id,
            name='test',
            email='test@test.com',
            )

    assert user.id == userInDB.id 


def test_ur4_find_should_return_none_when_one_of_arg_is_wrong(usersSeededFixture):

    userInDB = usersSeededFixture

    userRepo = UserRepository()

    user = userRepo.find(
            id=userInDB.id,
            name='wrong',
            email='test@test.com',
            )

    assert user is None


def test_ur5_getByEmail(usersSeededFixture):

    userInDB = usersSeededFixture

    userRepo = UserRepository()

    user = userRepo.getByEmail('test@test.com')

    assert user.id == userInDB.id


def test_ur6_delete(exSession, usersSeededFixture):

    user = usersSeededFixture

    userRepo = UserRepository()

    userRepo.delete(user.id)

    exSession.commit()

    deletedUser = userRepo.get(user.id)

    assert deletedUser is None


def test_ur7_deleteByEmail(exSession, usersSeededFixture):

    user = usersSeededFixture

    userRepo = UserRepository()

    userRepo.deleteByEmail(user.email)

    exSession.commit()

    deletedUser = userRepo.get(user.id)

    assert deletedUser is None
