from Configs.app import app
from Infrastructure.DataModels.UserModel import User
from typing import Dict
from Resources.viewModels.UserSchema import UserSchema
from Infrastructure.transactionDecorator import db_transaction
from application.FileService import FileService
from Infrastructure.repositories.UserRepository import UserRepository
from exceptions.UserNotFoundException import UserNotFoundException
from werkzeug.datastructures import FileStorage


class UserService(object):

    _blogSchema: UserSchema

    _fileService: FileService

    _userRepository: UserRepository

    def __init__(self):
        self._userSchema = UserSchema(only=['id', 'name', 'email', 'avatarUrl'])
        self._fileService = FileService()
        self._userRepository = UserRepository()

    def getUserService(self, userId: str) -> Dict:
        app.logger.info("start get user service")
        print("start get user service")

        targetUser = self._userRepository.get(id=userId)

        if targetUser is None:
            raise UserNotFoundException

        targetUser = self._userSchema.dump(targetUser)

        return targetUser

    @db_transaction()
    def updateUserService(self, userId: str, input: Dict, avatarImage: FileStorage = None) -> User:
        app.logger.info("start update user service")
        print("start update user service")

        # need to implement 'optimistic locking' later
        # to avoid any confict concurrency request
        targetUser = self._userRepository.get(id=userId)

        if targetUser is None:
            raise UserNotFoundException

        if targetUser.avatarUrl is not None:
            if avatarImage is not None:
                self._fileService.deleteImageFile(targetUser.id, targetUser.avatarUrl)
                targetUser.avatarUrl = self._fileService.saveImageFileToDir(avatarImage, targetUser.id)
            else:
                if input.get("avatarDeleteFlag") is not None:
                    self._fileService.deleteImageFile(targetUser.id, targetUser.avatarUrl)
                    targetUser.avatarUrl = None
        else:
            if avatarImage is not None:
                targetUser.avatarUrl = self._fileService.saveImageFileToDir(avatarImage, targetUser.id)

        targetUser.name = input.get('name')
        targetUser.email = input.get('email')
        if input.get('password', None) is not None and input.get('password'):
            targetUser.password = input.get('password')

        targetUser = self._userSchema.dump(targetUser)

        return targetUser
