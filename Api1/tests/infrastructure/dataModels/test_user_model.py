from Infrastructure.DataModels.UserModel import User


def test_u1_hash_password(exSession):

    tempUser = User(
            name="test",
            email="test@test.com",
            password="plain_password"
            )

    exSession.add(tempUser)
    exSession.commit()

    queryUser = exSession.query(User).filter_by(email="test@test.com").first()
    assert queryUser.verifyPassword("plain_password")
