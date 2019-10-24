from Infrastructure.DataModels.UserModel import User


def test_u1_hash_password_should_return_hashed_password():

    tempUser = User()
    tempUser.hashPassword("password")

    assert tempUser.verifyPassword("password") is True
