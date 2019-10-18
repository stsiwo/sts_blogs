from Configs.app import app
from flask import request, jsonify
from Infrastructure.DataModels.UserModel import User
from application.TokenService import TokenService


class LoginService(object):

    _tokenService: TokenService

    def __init__(self):
        self._tokenService = TokenService()

    def loginUserService(self):
        app.logger.info("start login user service")
        print("start login user service")

        loginUser = User.query.filter_by(email=request.json.get('email'), password=request.json.get('password')).first()

        if loginUser is None:
            response = jsonify({'Not Found': False})
            response.status_code = 404
            return response
        else:
            # construct response
            response = jsonify({'success': True})
            response.status_code = 200

            # create jwt tokens
            self._tokenService.createJwtToken(
                 response,
                 {
                     'id': loginUser.id,
                     "name": loginUser.name,
                     "roles": [role.name for role in loginUser.roles]
                 })

            return response
