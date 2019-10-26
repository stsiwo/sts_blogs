from Configs.app import app
from flask import abort
from Infrastructure.repositories.UserRepository import UserRepository
from Resources.viewModels.UserSchema import UserSchema
from exceptions.EmailNotFoundException import EmailNotFoundException
from exceptions.PasswordInvalidException import PasswordInvalidException


class LoginService(object):

    _userSchema: UserSchema

    _userRepository: UserRepository

    def __init__(self):
        self._userRepository = UserRepository()
        self._userSchema = UserSchema()

    def loginUserService(self, email: str, password: str):
        app.logger.info("start login user service")
        print("start login user service")

        loginUser = self._userRepository.find(email=email)

        if loginUser is None:
            raise EmailNotFoundException

        if not loginUser.verifyPassword(password):
            raise PasswordInvalidException

        return loginUser
