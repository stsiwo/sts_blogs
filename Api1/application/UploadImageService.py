from Configs.app import app
from Configs.extensions import db
from typing import Dict, BinaryIO
from Infrastructure.transactionDecorator import db_transaction
from application.FileServiceDep import FileServiceDep
from Infrastructure.DataModels.UserModel import User


class UploadImageService(object):

    _fileService: FileServiceDep

    def __init__(self):
        self._fileService = FileServiceDep()

    @db_transaction()
    def saveUploadImageService(self, files: Dict[str, BinaryIO], fileKeyName: str, userId: str) -> str:
        app.logger.info("start update uploadImage service")
        print("start update uploadImage service")

        uploadedImagePath: str = self._fileService.saveImageFileToDir(
                files=files,
                fileKeyName=fileKeyName)

        imageUploader = db.session.query(User).get(userId)
        imageUploader.avatarUrl = uploadedImagePath

        return uploadedImagePath

    @db_transaction()
    def updateUploadImageService(self, files: Dict[str, BinaryIO], fileKeyName: str, originalFileName: str, userId: str) -> str:
        app.logger.info("start update uploadImage service")
        print("start update uploadImage service")

        updatedImagePath: str = self._fileService.updateImageFileToDir(
                files=files,
                fileKeyName=fileKeyName,
                originalFileName=originalFileName)

        imageUploader = db.session.query(User).get(userId)
        imageUploader.avatarUrl = updatedImagePath

        return updatedImagePath
