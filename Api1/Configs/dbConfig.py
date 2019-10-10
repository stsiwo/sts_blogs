from flask_sqlalchemy import SQLAlchemy
import sys

thismodule = sys.modules[__name__]
thismodule.db = None


def configureDb(app):
    # configure app for api
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # create db object
    thismodule.db = SQLAlchemy(app)

    # configure data model classes
    import Infrastructure.DataModels.registerDataModels
