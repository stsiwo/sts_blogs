from flask_restful import reqparse
from Resources.validators.base.arguments.emailArg import addEmailArg
from Resources.validators.base.arguments.passwordArg import addPasswordArg


def userLoginParser():
    parser = reqparse.RequestParser(bundle_errors=True)
    addEmailArg(parser)
    addPasswordArg(parser)
    return parser
