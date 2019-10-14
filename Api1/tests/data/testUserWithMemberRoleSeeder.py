from flask_sqlalchemy import SQLAlchemy
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.UserModel import User


def testUserWithMemberRoleSeeder(db: SQLAlchemy):
    # initial role model data
    memberRole = db.session.query(Role).filter_by(name='member').first()

    testUser = User(
            name='test_name',
            email='test@test.com',
            password='password'
            )

    testUser.roles.append(memberRole)

    db.session.add(testUser)

    db.session.commit()
