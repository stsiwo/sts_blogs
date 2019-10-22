from flask_restful import Resource
from Resources.validators.validatorDecorator import validate_request_with
from Configs.app import app
from flask import jsonify, request
from exceptions.EmailServiceException import EmailServiceException
from exceptions.EmailAddressNotFoundException import EmailAddressNotFoundException
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

        try:
            self._passwordResetService.requestForgotPasswordService(
                    email=request.json.get('email')
                    )
            response = jsonify({})
            response.status_code = 202
            return response
        except EmailAddressNotFoundException as e:
            response = jsonify({'msg': 'provided email is not found'})
            response.status_code = 404
            return response
        except EmailServiceException as e:
            response = jsonify({'msg': 'internal email service has a problem. please retry again'})
            response.status_code = 500
            return response
