from flask import jsonify
from flask_jwt_extended import (
    jwt_refresh_token_required,
    get_jwt_identity,
    unset_jwt_cookies,
    create_access_token,
    set_access_cookies
)
from flask_restful import Resource
from Configs.extensions import jwt
from typing import Dict

# use this when jwt authentication needed
# @jwt_required
# username = get_jwt_identity()


@jwt.user_claims_loader
def add_claims_to_access_token(identity: Dict):
    print("constructing claim in jwt")
    return {
        'name': identity['name'],
        'roles': identity['roles'],
    }


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
