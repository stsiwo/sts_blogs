from flask_sqlalchemy import SQLAlchemy
from tests.data.factories.BlogFactory import BlogFactory
from Infrastructure.DataModels.BlogModel import Blog
import utils


def blogsSeed(db: SQLAlchemy):

    db.session.bulk_save_objects([
        BlogFactory(),
        BlogFactory(),
        BlogFactory()
            ])

    blogs = db.session.query(Blog).all()
    utils.prettyPrint(blogs)
