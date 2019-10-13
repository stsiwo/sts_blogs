from flask import Flask
from Configs.extensions import (
        api, db, jwt, migrate
        )
# import all model class of DataModels directory
# spec says "import *" is anti-pattern but other developers does
# not need to know all modules under DataModels.
# this is for just helping 'migration' can detect any change in data models
from Infrastructure.DataModels import *
# import all routes
import Resources.configureRoute


# the order must be kept
def configureApp(config_object="Configs.settings"):
    # create db object
    app = Flask(__name__)
    app.config.from_object(config_object)

    # extensions
    api.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # register aspect oriented methods
    # registerAops()

    return app
