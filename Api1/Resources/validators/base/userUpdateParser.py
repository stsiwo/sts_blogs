from Resources.validators.base.userSignupParser import userSignupParser
import werkzeug


def userUpdateParser():
    parser = userSignupParser()
    parser.add_argument('avatarImage', type=werkzeug.datastructures.FileStorage, required=False, help='avatarImage is optional', location='files')

    return parser
