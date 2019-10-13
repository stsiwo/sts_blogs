from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.UserModel import User


def test_user_role_relationship(session, UserFactory, RoleFactory):

    role = RoleFactory.create(name="admin")
    user = UserFactory.create(roles=[role])

    roleList = session.query(Role).all()
    user = session.query(User).filter(User.name == user.name).first()

    assert user.roles == roleList
