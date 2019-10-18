from flask_restful import Resource
from flask import request, abort, jsonify, session
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import db
from flask_jwt_extended import jwt_required
from Configs.app import app


class Test(Resource):
    @jwt_required
    def get(self):
        app.logger.info("number of session item")
        app.logger.info(str(len(session)))
        for item in session:
            app.logger.info(item)
        return {"session": "session"}
