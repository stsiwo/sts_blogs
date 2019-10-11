from flask_restful import Resource
from flask import request, abort, jsonify
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import db


class Users(Resource):
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
