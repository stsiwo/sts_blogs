from flask import request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies,
)
from flask_restful import Resource
from Configs.extensions import jwt

# use this when jwt authentication needed
# @jwt_required
# username = get_jwt_identity()


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    return {
        'role': identity.roles,
    }


class TokenAuth(Resource):
    def post(self):
#        username = request.json.get('username', None)
#        password = request.json.get('password', None)
#        if username != 'test' or password != 'test':
#            return jsonify({'login': False}), 401
#
#        # Create the tokens we will be sending back to the user
#        access_token = create_access_token(identity=username)
#        refresh_token = create_refresh_token(identity=username)
#
#        # Set the JWTs and the CSRF double submit protection cookies
#        # in this response
#        resp = jsonify({'login': True})
#        resp.status_code = 200
#        set_access_cookies(resp, access_token)
#        set_refresh_cookies(resp, refresh_token)
#        return resp
        return "hey"


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        # Create the new access token
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)

        # Set the access JWT and CSRF double submit protection cookies
        # in this response
        resp = jsonify({'refresh': True})
        resp.status_code = 200
        set_access_cookies(resp, access_token)
        return resp


class TokenRemove(Resource):
    def post(self):
        resp = jsonify({'logout': True})
        resp.status_code = 200
        unset_jwt_cookies(resp)
        return resp
