from flask_restful import Resource
from flask import request, jsonify
from Resources.validators.validatorDecorator import validate_request_with
from flask_jwt_extended import jwt_required
from Resources.roleAccessDecorator import requires_jwt_role_claim
from Configs.app import app
from Resources.validators.userUpdateValidator import userUpdateValidator
from application.UserService import UserService
from typing import Dict


class Users(Resource):

    _userService: UserService

    def __init__(self):
        self._userService = UserService()

    # replace existing whole blogs or create whole blogs if does not exist
    # payload must be whole blogs (all properties of blog)
    # updating avatar image is different endpoint
    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @validate_request_with(userUpdateValidator)
    def put(self, user_id: str):
        app.logger.info("start processing put request at /users")
        print("start processing put request at /users")

        updatedUser: Dict[str, str] = self._userService.updateUserService(
                userId=user_id,
                input=request.json
                )

        # successfully updated and return its serialized and updated user
        # ==============================================================
        # NOTE: don't specify body when using 204 (NO CONTENT). even if you set response body
        # HTTP ignore the response body and client only receives no body
        # =============================================================
        response = jsonify(updatedUser)
        response.status_code = 200
        return response
