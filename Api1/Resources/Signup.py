from flask_restful import Resource, reqparse
from flask import jsonify


class Signup(Resource):
    # create new user
    def post(self):
        parser = reqparse.RequestParser(bundle_errors=True)
        # need to re-implement this request validation
        # REFACTOR
        parser.add_argument('name', type=str, required=True, help='name is required')
        parser.add_argument('email', type=str, required=True, help='email is required')
        parser.add_argument('password', type=str, required=True, help='password is required')
        args = parser.parse_args(strict=True)

        res = jsonify({'signup': 'signup'})
        res.status_code = 201
        return res
