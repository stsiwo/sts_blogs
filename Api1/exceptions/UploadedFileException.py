from exceptions.BaseException import BaseException


class UploadedFileException(BaseException):

    def __init__(self):
        super().__init__(
                title="uploaded file error",
                message="file does not selected or file type is not allowed",
                status_code=400
                )
