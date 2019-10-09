from flask import Flask
from Configs.apiConfig import configureApi
from Configs.dbConfig import configureDb
from Configs.jwtConfig import configureJwt
from Controllers.TokenController import configureTokenController
import sys
import logging

thismodule = sys.modules[__name__]
thismodule.app = None


def configureApp():
    # create db object
    thismodule.app = Flask(__name__)
    logging.info("app")

    configureApi(thismodule.app)

    configureDb(thismodule.app)

    configureJwt(thismodule.app)

    configureTokenController(thismodule.app)

    return thismodule.app
