from functools import wraps
from flask_jwt_extended import (
    get_jwt_claims
)
from flask import Response, jsonify
from typing import Set


def requires_jwt_role_claim(targetRoles: Set[str]):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            roleClaims = get_jwt_claims()['roles']
            if targetRoles.isdisjoint(set(roleClaims)):
                response: Response = jsonify({})
                # unauthorized
                response.status_code = 401
                return response
            else:
                return f(*args, **kwargs)
        return decorated_function
    return decorator
