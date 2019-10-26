from exceptions.BaseException import BaseException


class CommentNotFoundException(BaseException):

    def __init__(self):
        super().__init__(
                title="comment not found",
                message="specified blog does not have any comment yet",
                status_code=404
                )
