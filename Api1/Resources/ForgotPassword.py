from flask_restful import Resource
from Resources.validators.validatorDecorator import validate_request_with
from Configs.app import app
from flask import jsonify, request
from application.PasswordResetService import PasswordResetService
from Resources.validators.forgotPasswordValidator import forgotPasswordValidator


class ForgotPassword(Resource):

    _passwordResetService: PasswordResetService

    def __init__(self):
        self._passwordResetService = PasswordResetService()

    @validate_request_with(forgotPasswordValidator)
    def post(self):
        app.logger.info("start processing forget-password request ...")
        print("start processing forget-password request ...")

        self._passwordResetService.requestForgotPasswordService(
                email=request.json.get('email')
                )
        response = jsonify({})
        response.status_code = 202
        return response
