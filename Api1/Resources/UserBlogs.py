from flask_restful import Resource
from flask import request, abort, jsonify
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import db
from Configs.app import app
from application.UserBlogService import UserBlogService
from typing import Dict, List
from Resources.roleAccessDecorator import requires_jwt_role_claim
from flask_jwt_extended import jwt_required
import utils


class UserBlogs(Resource):

    _userBlogService: UserBlogService

    def __init__(self):
        self._userBlogService = UserBlogService()

    # get all blogs
    # requires_jwt_role_claim must be after jwt_required
    # otherwise, you cannot access claim of jwt
    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    def get(self, user_id: str):
        app.logger.info("start processing get request at /blogs")
        print("start processing get request at /blogs")

        blogs: List[Dict] = self._userBlogService.getAllUserBlogService(user_id)

        response = jsonify(blogs)

        # blogs list of dict is empty
        if len(blogs) == 0:
            # NOT FOUND
            response.status_code = 404
        else:
            # OK
            response.status_code = 200

        return response

    # create new blog
    # use /users/{id}/blogs for creating blogs for specific user
    # def post(self):
    #     response = jsonify({})
    #     response.status_code = 202
    #     return response

    # replace existing whole blogs or create whole blogs if does not exist
    # payload must be whole blogs (all properties of blog)
    # def put(self):
    #     response = jsonify({})
    #     response.status_code = 203
    #     return response

    # patial update exisitng blogs
    # payload must be only properties to be updated (not include unchanged properties)
    # def patch(self):
    #     response = jsonify({})
    #     response.status_code = 204
    #     return response

    # delete whole blogs
    # def delete(self):
    #     response = jsonify({})
    #     response.status_code = 205
    #     return response
