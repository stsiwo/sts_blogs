from exceptions.BaseException import BaseException


class BadSignatureException(BaseException):

    def __init__(self):
        super().__init__(
                title="bad signature",
                message="token is invalid. it seems wrong type. please start over again.",
                status_code=400
                )
