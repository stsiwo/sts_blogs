from flask_restful import Resource, reqparse
from flask import request, redirect, jsonify
from Configs.extensions import db
from Configs.extensions import api
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from Resources.Token import TokenAuth
from Configs.app import app


class Test(Resource):
    # create new user
    def post(self):
        return redirect(api.url_for(Test, _method='GET'), code=301)

    def get(self):
        app.logger.info("get in Test src")
        return jsonify({"get": "in test"})
