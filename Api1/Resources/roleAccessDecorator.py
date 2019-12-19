from functools import wraps
from flask_jwt_extended import (
    get_jwt_claims
)
from flask import Response, jsonify
from typing import Set
from exceptions.UnauthorizedExceptionTypeEnum import UnauthorizedExceptionTypeEnum
from exceptions.UnauthorizedException import UnauthorizedException


def requires_jwt_role_claim(targetRoles: Set[str]):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            roleClaims = get_jwt_claims()['roles']
            if targetRoles.isdisjoint(set(roleClaims)):
                raise UnauthorizedException(message='unauthorized role', type=UnauthorizedExceptionTypeEnum.UNAUTHORIZED_ROLE)
            else:
                return f(*args, **kwargs)
        return decorated_function
    return decorator
