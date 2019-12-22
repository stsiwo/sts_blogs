from flask_restful import reqparse
from Resources.validators.base.arguments.passwordArg import addPasswordArg


def passwordResetValidator():
    parser = reqparse.RequestParser(bundle_errors=True)
    # args: query string
    parser.add_argument('token', type=str, location='args')
    addPasswordArg(parser)
    args = parser.parse_args(strict=True)
