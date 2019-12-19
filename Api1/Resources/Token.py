from flask import jsonify
from flask_jwt_extended import (
    jwt_refresh_token_required,
    get_jwt_identity,
    unset_jwt_cookies,
    create_access_token,
    set_access_cookies
)
from flask_restful import Resource
from application.TokenService import TokenService


class TokenRemove(Resource):
    def post(self):
        resp = jsonify({'logout': True})
        resp.status_code = 200
        unset_jwt_cookies(resp)
        return resp


class TokenRefresh(Resource):

    _tokenService: TokenService

    def __init__(self):
        self._tokenService = TokenService()

    @jwt_refresh_token_required
    def post(self):
        print('start handling refresh token at refresh endpoint')
        currentIdentity = get_jwt_identity()

        # construct response
        response = jsonify({'success': True})
        response.status_code = 200

        # create jwt tokens
        self._tokenService.createJwtToken(response, currentIdentity)

        return response
