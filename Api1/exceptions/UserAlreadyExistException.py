from exceptions.BaseException import BaseException
from typing import Dict


class UserAlreadyExistException(BaseException):

    def __init__(self, title: str = None, message: str = None, status_code: int = None, payload: Dict[str, str] = None):
        super().__init__(
                title=title if title is not None else "user already exists",
                message=message if message is not None else "provided email already exists.",
                status_code=status_code if status_code is not None else 409
                )
