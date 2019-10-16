from flask_sqlalchemy import SQLAlchemy
from tests.data.factories.BlogFactory import BlogFactory
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
import utils


def blogsSeed(db: SQLAlchemy):

    db.session.bulk_save_objects([
        BlogFactory(),
        BlogFactory(),
        BlogFactory()
            ])

    blogs = db.session.query(Blog).all()
    utils.printObject(blogs)

    users = db.session.query(User).all()
    utils.printObject(users)

    roles = db.session.query(Role).all()
    utils.printObject(roles)
