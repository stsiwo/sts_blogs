from flask_sqlalchemy import SQLAlchemy
from tests.data.factories.BlogFactory import BlogFactory
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from .import printObject


def blogsSeed(db: SQLAlchemy):

    db.session.bulk_save_objects([
        BlogFactory(),
        BlogFactory(),
        BlogFactory()
            ])

    blogs = db.session.query(Blog).all()
    printObject(blogs)

    users = db.session.query(User).all()
    printObject(users)

    roles = db.session.query(Role).all()
    printObject(roles)
