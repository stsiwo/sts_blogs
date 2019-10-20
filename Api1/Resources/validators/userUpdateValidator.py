from Resources.validators.base.userUpdateParser import userUpdateParser


def userUpdateValidator():
    parser = userUpdateParser()
    args = parser.parse_args(strict=True)
