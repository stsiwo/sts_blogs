from exceptions.BaseException import BaseException


class BlogNotFoundException(BaseException):

    def __init__(self):
        super().__init__(
                title="blog not found",
                message="specified blog does not exist.",
                status_code=404
                )
