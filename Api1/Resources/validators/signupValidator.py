from flask_restful import reqparse


def signupValidator():
    parser = reqparse.RequestParser(bundle_errors=True)
    # need to re-implement this request validation
    parser.add_argument('name', type=str, required=True, help='name is required')
    parser.add_argument('email', type=str, required=True, help='email is required')
    parser.add_argument('password', type=str, required=True, help='password is required')
    args = parser.parse_args(strict=True)
