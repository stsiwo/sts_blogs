from flask import Flask
from Configs.extensions import (
        api, db, jwt, migrate
        )
# import all model class of DataModels directory
import Infrastructure.DataModels
import Infrastructure.DataModels.TestModel
# import all routes
import Resources.configureRoute
# from Aop.registerAops import registerAops


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
