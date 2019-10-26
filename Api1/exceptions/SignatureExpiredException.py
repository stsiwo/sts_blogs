from exceptions.BaseException import BaseException


class SignatureExpiredException(BaseException):

    def __init__(self):
        super().__init__(
                title="signature expired",
                message="token is exipred. please start over again.",
                status_code=400
                )
