from flask_restful import Resource
from flask import request, abort, jsonify
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import db


class Blogs(Resource):

    # get all blogs
    def get(self):
        response = jsonify({})
        response.status_code = 201
        return response

    # create new blog
    def post(self):
        response = jsonify({})
        response.status_code = 202
        return response

    # replace existing whole blogs or create whole blogs if does not exist
    # payload must be whole blogs (all properties of blog)
    def put(self):
        response = jsonify({})
        response.status_code = 203
        return response

    # patial update exisitng blogs
    # payload must be only properties to be updated (not include unchanged properties)
    def patch(self):
        response = jsonify({})
        response.status_code = 204
        return response

    # delete whole blogs
    def delete(self):
        response = jsonify({})
        response.status_code = 205
        return response
