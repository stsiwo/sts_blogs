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
        self._userSchema = UserSchema()
        self._fileService = FileService()
        self._userRepository = UserRepository()

    @db_transaction()
    def updateUserService(self, userId: str, input: Dict, avatarFile: FileStorage = None) -> User:
        app.logger.info("start update user service")
        print("start update user service")

        # need to implement 'optimistic locking' later
        # to avoid any confict concurrency request
        targetUser = self._userRepository.get(id=userId)

        if targetUser is None:
            raise UserNotFoundException

        targetUser.name = input.get('name')
        targetUser.email = input.get('email')
        targetUser.password = input.get('password')
        targetUser.avatarUrl = self._fileService.updateImageFileToDir(avatarFile, targetUser.id, targetUser.avatarUrl) if avatarFile is not None else targetUser.avatarUrl

        targetUser = self._userSchema.dump(targetUser)

        return targetUser
