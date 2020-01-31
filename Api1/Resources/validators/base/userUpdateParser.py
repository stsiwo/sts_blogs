from flask_restful import reqparse
import werkzeug
from Resources.validators.base.arguments.user.emailArg import addEmailArg
from Resources.validators.base.arguments.user.nameArg import addNameArg


def userUpdateParser():
    parser = reqparse.RequestParser(bundle_errors=True)
    addNameArg(parser)
    addEmailArg(parser)
    parser.add_argument('password', type=str, required=False)
    parser.add_argument('avatarDeleteFlag', type=str, required=False)
    parser.add_argument('avatarImage', type=werkzeug.datastructures.FileStorage, required=False, help='avatarImage is optional', location='files')

    return parser
