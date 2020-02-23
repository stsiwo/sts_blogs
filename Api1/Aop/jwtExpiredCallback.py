from Configs.extensions import jwt
from flask import jsonify
from exceptions.UnauthorizedException import UnauthorizedExceptionTypeEnum
from Configs.app import app


@jwt.expired_token_loader
def my_expired_token_callback(expired_token):
    app.logger.info('***start handling expired token at expired_token_loader mw')
    token_type = expired_token['type']
    app.logger.info('*** expired token: {}'.format(expired_token))
    if token_type == 'access':
        # NOTE: must return response. can't raise exception. flask does not catch and replace with Exception response
        # raise UnauthorizedException(message='access token is expired', type=UnauthorizedExceptionTypeEnum.ACCESS_TOKEN_EXPIRED)
        return jsonify({
            'type': UnauthorizedExceptionTypeEnum.ACCESS_TOKEN_EXPIRED,
            'status': 401,
            'msg': 'The {} token has expired'.format(token_type)
        }), 401
    elif token_type == 'refresh':
        return jsonify({
            'type': UnauthorizedExceptionTypeEnum.ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED,
            'status': 401,
            'msg': 'The {} token has expired'.format(token_type)
        }), 401
    else:
        raise Exception('unsupported token has expired at jwt.my_expired_token_callback')
