from flask_restful import reqparse
from Resources.validators.base.userLoginParser import userLoginParser
from Resources.validators.base.arguments.user.nameArg import addNameArg


def userSignupParser():
    parser = userLoginParser()
    addNameArg(parser)

    return parser
