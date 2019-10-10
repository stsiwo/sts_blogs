from flask import Flask
from Configs.apiConfig import configureApi
from Configs.dbConfig import configureDb
from Configs.jwtConfig import configureJwt
from Controllers.TokenController import configureTokenController
from Aop.registerAops import registerAops
import sys
import logging

thismodule = sys.modules[__name__]
thismodule.app = None


# the order must be kept
def configureApp():
    # create db object
    thismodule.app = Flask(__name__)
    logging.info("app")

    configureApi(thismodule.app)

    configureDb(thismodule.app)

    configureJwt(thismodule.app)

    configureTokenController(thismodule.app)

    # register aspect oriented methods
    registerAops()

    return thismodule.app
