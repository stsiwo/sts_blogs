from Configs.extensions import jwt
from flask import jsonify
from exceptions.UnauthorizedException import UnauthorizedExceptionTypeEnum


@jwt.unauthorized_loader
def my_unauthorized_loader(reason_why_jwt_not_found):
    print('***start handling unauthorized (not jwt found) at unauthorized_loader mw')
    print(reason_why_jwt_not_found)
    # NOTE: must return response. can't raise exception. flask does not catch and replace with Exception response
    # raise UnauthorizedException(message='access token is expired', type=UnauthorizedExceptionTypeEnum.NEITHER_ACCESS_TOKEN_AND_REFRESH_TOKEN_EXIST)
    return jsonify({
        'type': UnauthorizedExceptionTypeEnum.NEITHER_ACCESS_TOKEN_AND_REFRESH_TOKEN_EXIST,
        'status': 401,
        'msg': 'no access token and refresh token are provided: {}'.format(reason_why_jwt_not_found)
    }), 401
