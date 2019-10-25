from flask_restful import Resource
from flask import request, jsonify
from application.LoginService import LoginService
from Resources.validators.validatorDecorator import validate_request_with
from Resources.validators.loginValidator import loginValidator
from Configs.app import app
from application.TokenService import TokenService
from typing import Dict


class Login(Resource):

    _service: LoginService

    _tokenService: TokenService

    def __init__(self):
        self._tokenService = TokenService()
        self._service = LoginService()

    @validate_request_with(loginValidator)
    def post(self):
        app.logger.info("received post request at /login")
        loginedUser: Dict = self._service.loginUserService(
                email=request.json.get('email'),
                password=request.json.get('password'),
                )

        response = jsonify({'message': 'login success'})
        response.status_code = 200

        # create jwt tokens
        self._tokenService.createJwtToken(
             response,
             {
                 'id': loginedUser.id,
                 "name": loginedUser.name,
                 "roles": [role.name for role in loginedUser.roles]
             })

        return response
