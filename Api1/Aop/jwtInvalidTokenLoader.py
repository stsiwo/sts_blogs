from Configs.extensions import jwt
from flask import jsonify
from Configs import app


@jwt.invalid_token_loader
def my_invalid_token_loader(reason_why_jwt_is_invalid):
    app.logger.info('***start handling invalid access token (jwt) at invalid_token_loader mw')
    app.logger.info(reason_why_jwt_is_invalid)
    # NOTE: must return response. can't raise exception. flask does not catch and replace with Exception response
    # raise InvalidJwtTokenException
    return jsonify({
        'status': 422,
        'msg': 'invalid jwt (access) token: {}'.format(reason_why_jwt_is_invalid)
    }), 422
