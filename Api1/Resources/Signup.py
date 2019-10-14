from flask_restful import Resource
from application.SignupService import SignupService
from Resources.validators.validatorDecorator import validate_request_with
from Resources.validators.signupValidator import signupValidator
from Configs.app import app


class Signup(Resource):

    _service: SignupService

    def __init__(self):
        self._service = SignupService()

    @validate_request_with(signupValidator)
    def post(self):
        app.logger.info("received post request at /signup")
        return self._service.registerUserService()
