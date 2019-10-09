from flask_sqlalchemy import SQLAlchemy
import sys

thismodule = sys.modules[__name__]
thismodule.db = None


def configureDb(app):
    # configure app for api
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    # create db object
    thismodule.db = SQLAlchemy(app)
