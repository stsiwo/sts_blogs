from exceptions.BaseException import BaseException


class EmailNotFoundException(BaseException):

    def __init__(self):
        super().__init__(
                title="email not found",
                message="provided email is not found",
                status_code=404
                )
