from exceptions.BaseException import BaseException


class PasswordInvalidException(BaseException):

    def __init__(self):
        super().__init__(
                title="password invalid",
                message="entered password is invalid.",
                status_code=400
                )
