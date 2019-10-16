from flask_sqlalchemy import SQLAlchemy
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.UserModel import User
from tests.data.seeder import seed
from tests.data.fakers.faker import fake


def userSeed(db: SQLAlchemy):

    memberRole = db.session.query(Role).filter_by(name='member').first()

    seed(db)

    user = User(
            name=fake.name(),
            email=fake.email(),
            password=fake.password(),
            roles=[memberRole]
            )
    db.session.add(user)
