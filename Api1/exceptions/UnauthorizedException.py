from exceptions.BaseException import BaseException
from exceptions.UnauthorizedExceptionTypeEnum import UnauthorizedExceptionTypeEnum
import json


class UnauthorizedException(BaseException):

    def __init__(self, message: str, type: UnauthorizedExceptionTypeEnum):
        super().__init__(
                title="Unauthorized",
                message=message,
                status_code=401,
                # NOTE: when need to put value of Enum to json (e.g., response), need to dump to string
                #   otherwise, encounter below error:
                #   TypeError: Object of type UnauthorizedExceptionTypeEnum is not JSON serializable
                #   solution: use 'json.dumps(Enum.yourValue)'
                payload={
                    'type': json.dumps(type),
                    }
                )
