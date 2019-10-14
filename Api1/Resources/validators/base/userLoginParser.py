from flask_restful import reqparse


def userLoginParser():
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('email', type=str, required=True, help='email is required')
    parser.add_argument('password', type=str, required=True, help='password is required')

    return parser
