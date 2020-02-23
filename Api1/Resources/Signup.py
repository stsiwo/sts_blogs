from flask_restful import Resource
from application.SignupService import SignupService
from Resources.validators.validatorDecorator import validate_request_with
from Resources.validators.signupValidator import signupValidator
from Configs.app import app
from application.TokenService import TokenService
from flask import request, jsonify
from typing import Dict
from Aop.loggingDecorator import loggingDecorator


class Signup(Resource):

    _service: SignupService

    _tokenService: TokenService

    def __init__(self):
        self._service = SignupService()
        self._tokenService = TokenService()

    @validate_request_with(signupValidator)
    @loggingDecorator()
    def post(self):

        newUser: Dict = self._service.registerUserService(
                name=request.json.get('name'),
                email=request.json.get('email'),
                password=request.json.get('password'),
                )

        # construct response
        response = jsonify({'user': newUser})
        response.status_code = 200

        # create jwt tokens
        self._tokenService.createJwtToken(
             response,
             {
                 'id': newUser['id'],
                 "name": newUser['name'],
                 "roles": [role for role in newUser['roles']]
             })

        return response
