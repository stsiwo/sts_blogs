from flask_restful import reqparse
from Resources.validators.base.arguments.user.emailArg import addEmailArg


def forgotPasswordValidator():
    parser = reqparse.RequestParser(bundle_errors=True)
    addEmailArg(parser)
    args = parser.parse_args(strict=True)
