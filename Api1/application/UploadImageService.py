from Configs.extensions import db
from typing import Dict, BinaryIO
from Infrastructure.transactionDecorator import db_transaction
from application.FileServiceDep import FileServiceDep
from Infrastructure.DataModels.UserModel import User
from Aop.loggingDecorator import loggingDecorator


class UploadImageService(object):

    _fileService: FileServiceDep

    def __init__(self):
        self._fileService = FileServiceDep()

    @db_transaction()
    @loggingDecorator()
    def saveUploadImageService(self, files: Dict[str, BinaryIO], fileKeyName: str, userId: str) -> str:

        uploadedImagePath: str = self._fileService.saveImageFileToDir(
                files=files,
                fileKeyName=fileKeyName)

        imageUploader = db.session.query(User).get(userId)
        imageUploader.avatarUrl = uploadedImagePath

        return uploadedImagePath

    @db_transaction()
    @loggingDecorator()
    def updateUploadImageService(self, files: Dict[str, BinaryIO], fileKeyName: str, originalFileName: str, userId: str) -> str:

        updatedImagePath: str = self._fileService.updateImageFileToDir(
                files=files,
                fileKeyName=fileKeyName,
                originalFileName=originalFileName)

        imageUploader = db.session.query(User).get(userId)
        imageUploader.avatarUrl = updatedImagePath

        return updatedImagePath
