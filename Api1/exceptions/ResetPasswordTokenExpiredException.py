from exceptions.BaseException import BaseException


class ResetPasswordTokenExpiredException(BaseException):

    def __init__(self):
        super().__init__(
                title="reset password token expired",
                message="reset password token is exipred. please start over again.",
                status_code=400
                )
