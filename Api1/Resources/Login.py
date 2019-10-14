from flask_restful import Resource
from application.LoginService import LoginService
from Resources.validators.validatorDecorator import validate_request_with
from Resources.validators.loginValidator import loginValidator
from Configs.app import app


class Login(Resource):

    _service: LoginService

    def __init__(self):
        self._service = LoginService()

    @validate_request_with(loginValidator)
    def post(self):
        app.logger.info("received post request at /login")
        return self._service.loginUserService()
