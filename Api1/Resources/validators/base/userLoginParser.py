from flask_restful import reqparse
from Resources.validators.base.arguments.user.emailArg import addEmailArg
from Resources.validators.base.arguments.user.passwordArg import addPasswordArg


def userLoginParser():
    parser = reqparse.RequestParser(bundle_errors=True)
    addEmailArg(parser)
    addPasswordArg(parser)
    return parser
