from Configs.extensions import jwt
from flask import jsonify
from exceptions.UnauthorizedException import UnauthorizedExceptionTypeEnum


@jwt.expired_token_loader
def my_expired_token_callback(expired_token):
    print('***start handling expired token at expired_token_loader mw')
    token_type = expired_token['type']
    print(expired_token)
    # NOTE: must return response. can't raise exception. flask does not catch and replace with Exception response
    # raise UnauthorizedException(message='access token is expired', type=UnauthorizedExceptionTypeEnum.ACCESS_TOKEN_EXPIRED)
    return jsonify({
        'type': UnauthorizedExceptionTypeEnum.ACCESS_TOKEN_EXPIRED,
        'status': 401,
        'msg': 'The {} token has expired'.format(token_type)
    }), 401
