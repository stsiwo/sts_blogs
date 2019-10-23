from flask_restful import Resource
from Resources.validators.validatorDecorator import validate_request_with
from Configs.app import app
from flask import jsonify, request
from application.PasswordResetService import PasswordResetService
from Resources.validators.passwordResetValidator import passwordResetValidator
from itsdangerous import BadSignature, SignatureExpired


class PasswordReset(Resource):

    _passwordResetService: PasswordResetService

    def __init__(self):
        self._passwordResetService = PasswordResetService()

    @validate_request_with(passwordResetValidator)
    def post(self):
        app.logger.info("start processing forget-password request ...")
        print("start processing forget-password request ...")

        try:
            self._passwordResetService.resetPasswordService(
                    token=request.args.get('token'),
                    newPassword=request.json.get('password')
                    )
        except SignatureExpired as e:
            response = jsonify({
                'msg': 'token is already expired. please start over again',
                'err': 'SignatureExpired'
                })
            response.status_code = 400
            return response
        except BadSignature as e:
            response = jsonify({
                'msg': 'token is invalid. you seem using wrong token',
                'err': 'BadSignature'
                })
            response.status_code = 400
            return response
        else:
            response = jsonify({})
            response.status_code = 204
            return response
