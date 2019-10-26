from typing import Dict


class BaseException(Exception):

    title: str

    status_code: int

    def __init__(self, message: str = '', status_code: int = 400, payload: Dict[str, str] = {}, title: str = ''):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload
        self.title = title

    def to_dict(self):
        response = {
                'title': self.title,
                'message': self.message,
                **self.payload
                }
        return response
