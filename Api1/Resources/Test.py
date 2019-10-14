from flask_restful import Resource, reqparse
from flask import request, redirect, jsonify
from Configs.extensions import db
from Configs.extensions import api
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from Configs.app import app


class Test(Resource):
    def get(self):
        app.logger.info("test get endpoint")
        return redirect(api.url_for(Test1, _method='POST'), code=301)


class Test1(Resource):

    def get(self):
        app.logger.info("test1 get endpoint")
        return jsonify({"get": "in test1"})

    def post(self):
        app.logger.info("test1 post endpoint")
        return jsonify({"post": "in test1"})
