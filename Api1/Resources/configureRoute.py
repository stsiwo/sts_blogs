from Configs.extensions import api
from Resources.Token import (
        TokenAuth,
        TokenRefresh,
        TokenRemove
        )
from Resources.Users import Users

api.add_resource(TokenAuth, '/token/auth')
api.add_resource(TokenRefresh, '/token/refresh')
api.add_resource(TokenRemove, '/token/remove')
api.add_resource(Users, '/users/<string:user_id>')
