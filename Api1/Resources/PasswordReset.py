from flask_restful import Resource
from Resources.validators.validatorDecorator import validate_request_with
from Configs.app import app
from flask import jsonify, request
from application.PasswordResetService import PasswordResetService
from Resources.validators.passwordResetValidator import passwordResetValidator
from Aop.loggingDecorator import loggingDecorator


class PasswordReset(Resource):

    _passwordResetService: PasswordResetService

    def __init__(self):
        self._passwordResetService = PasswordResetService()

    @validate_request_with(passwordResetValidator)
    @loggingDecorator()
    def post(self):

        self._passwordResetService.resetPasswordService(
                token=request.args.get('token'),
                newPassword=request.json.get('password')
                )

        response = jsonify({})
        response.status_code = 204
        return response
