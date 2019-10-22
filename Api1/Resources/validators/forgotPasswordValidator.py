from flask_restful import reqparse
from Resources.validators.base.arguments.passwordArg import addPasswordArg


def forgotPasswordValidator():
    parser = reqparse.RequestParser(bundle_errors=True)
    addPasswordArg(parser)
    args = parser.parse_args(strict=True)
