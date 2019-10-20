from flask_restful import reqparse
from Resources.validators.base.userLoginParser import userLoginParser


def userSignupParser():
    parser = userLoginParser()
    parser.add_argument('name', type=str, required=True, help='name is required')

    return parser
