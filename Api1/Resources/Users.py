from flask_restful import Resource
from flask import request, abort, jsonify
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import db
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

    def get(self):
        return {"all_users": "get"}

    # create new user
    def post(self):
        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')
        if username is None or password is None:
            abort(400)  # missing arguments
        if User.query.filter_by(email=email).first() is not None:
            abort(400)  # email exists
        user = User(name=username, email=email)
        user.hash_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'username': user.name}), 201

    # replace existing whole blogs or create whole blogs if does not exist
    # payload must be whole blogs (all properties of blog)
    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @validate_request_with(userUpdateValidator)
    def put(self, user_id: str):
        app.logger.info("start processing put request at /users")
        print("start processing put request at /users")

        updatedUser: Dict[str, str] = self._userService.updateUserService(
                userId=user_id,
                input=request.json,
                files=request.files
                )

        # target user is not found
        if not updatedUser:
            response = jsonify({'msg': 'specified user is not found'})
            response.status_code = 404
            return response
        # successfully updated and return its serialized and updated user
        # ==============================================================
        # NOTE: don't specify body when using 204 (NO CONTENT). even if you set response body
        # HTTP ignore the response body and client only receives no body
        # =============================================================
        else:
            response = jsonify(updatedUser)
            response.status_code = 200
            return response
