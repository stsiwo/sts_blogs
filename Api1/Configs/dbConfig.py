from flask_sqlalchemy import SQLAlchemy
import sys
from flask_migrate import Migrate

thismodule = sys.modules[__name__]
thismodule.db = None


def configureDb(app):
    # configure app for api
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/api1.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # create db object
    thismodule.db = SQLAlchemy(app)
    migrate = Migrate(app, thismodule.db)

    # configure data model classes
    import Infrastructure.DataModels.registerDataModels
