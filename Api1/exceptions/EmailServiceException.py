from exceptions.BaseException import BaseException


class EmailServiceException(BaseException):

    def __init__(self):
        super().__init__(
                title="email service error",
                message="internal email service has a problem. please retry again",
                status_code=500
                )
