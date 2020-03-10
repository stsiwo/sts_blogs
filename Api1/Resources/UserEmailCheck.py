from flask_restful import Resource
from Resources.validators.validatorDecorator import validate_request_with
from flask import jsonify, request
from Infrastructure.repositories.UserRepository import UserRepository
from Aop.loggingDecorator import loggingDecorator
from Resources.validators.userEmailCheckValidator import userEmailCheckValidator


class UserEmailCheck(Resource):

    _userRepository: UserRepository

    def __init__(self):
        self._userRepository = UserRepository()

    @validate_request_with(userEmailCheckValidator)
    @loggingDecorator()
    def post(self):

        isExist: bool = self._userRepository.isExistByEmail(
                email=request.json.get('email')
                )
        response = jsonify({})
        response.status_code = 204 if isExist is True else 404
        return response
