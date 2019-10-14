from Configs.extensions import api
from Resources.Token import (
        TokenRefresh,
        TokenRemove
        )
from Resources.Users import Users
from Resources.Signup import Signup
from Resources.Test import Test, Test1

api.add_resource(TokenRefresh, '/token/refresh')
api.add_resource(TokenRemove, '/token/remove')
api.add_resource(Users, '/users/<string:user_id>')
api.add_resource(Signup, '/signup')
api.add_resource(Test, '/test')
api.add_resource(Test1, '/test1')
