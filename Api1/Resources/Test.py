from flask_restful import Resource
from flask import request, abort, jsonify, session
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import db
from flask_jwt_extended import jwt_required
from Configs.app import app
from exceptions.BadSignatureException import BadSignatureException


class Test(Resource):

    def get(self):
        print('handling test get endpoint request')
        raise BadSignatureException
