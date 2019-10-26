from exceptions.BaseException import BaseException
from typing import Dict


class BlogNotFoundException(BaseException):

    def __init__(self, title: str = None, message: str = None, status_code: int = None, payload: Dict[str, str] = None):
        super().__init__(
                title=title if title is not None else "blog not found",
                message=message if message is not None else "specified blog does not exist.",
                status_code=status_code if status_code is not None else 404
                )
