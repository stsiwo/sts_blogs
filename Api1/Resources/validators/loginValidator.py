from Resources.validators.base.userLoginParser import userLoginParser


def loginValidator():
    parser = userLoginParser()
    args = parser.parse_args(strict=True)
