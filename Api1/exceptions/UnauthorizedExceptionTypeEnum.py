from enum import IntEnum

# NOTE: when need to put value of IntEnum to json (e.g., response), need to dump to string
#   otherwise, encounter below error:
#   TypeError: Object of type UnauthorizedExceptionTypeEnum is not JSON serializable
#   solution: use 'json.dumps(Enum.yourValue)'

# NOTE: if you use Enum, above method does not work. implement another method based on the reference:
# https://stackoverflow.com/questions/24481852/serialising-an-enum-member-to-json


class UnauthorizedExceptionTypeEnum(IntEnum):
    ACCESS_TOKEN_EXPIRED = 0,
    ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED = 1,
    NEITHER_ACCESS_TOKEN_AND_REFRESH_TOKEN_EXIST = 2,
    UNAUTHORIZED_ROLE = 3
