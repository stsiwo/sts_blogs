from flask_restful import Api
import sys
from Resources.User import User
from Resources.UserList import UserList

thismodule = sys.modules[__name__]
thismodule.api = None


def configureApi(app):
    # configure app for api

    # create api object
    thismodule.api = Api(app)

    configureResourceRoutes(thismodule.api)


def configureResourceRoutes(api):
    api.add_resource(UserList, '/users')
    api.add_resource(User, '/users/<user_id>')
