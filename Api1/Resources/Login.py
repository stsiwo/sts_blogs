from flask_restful import Resource
from flask import request, jsonify
from application.LoginService import LoginService
from Resources.validators.validatorDecorator import validate_request_with
from Resources.validators.loginValidator import loginValidator
from Configs.app import app
from application.TokenService import TokenService
from typing import Dict
from Aop.loggingDecorator import loggingDecorator


class Login(Resource):

    _service: LoginService

    _tokenService: TokenService

    def __init__(self):
        self._tokenService = TokenService()
        self._service = LoginService()

    @validate_request_with(loginValidator)
    @loggingDecorator()
    def post(self):

        loginedUser: Dict = self._service.loginUserService(
                email=request.json.get('email'),
                password=request.json.get('password'),
                )

        response = jsonify({'user': loginedUser})
        response.status_code = 200

        # create jwt tokens
        self._tokenService.createJwtToken(
             response,
             {
                 'id': loginedUser.get('id'),
                 "name": loginedUser.get('name'),
                 "roles": [role for role in loginedUser.get('roles')]
             })

        return response
