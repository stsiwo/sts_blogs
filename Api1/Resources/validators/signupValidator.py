from Resources.validators.base.userSignupParser import userSignupParser


def signupValidator():
    parser = userSignupParser()
    args = parser.parse_args(strict=True)
