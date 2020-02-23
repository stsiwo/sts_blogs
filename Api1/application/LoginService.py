from Configs.app import app
from Infrastructure.repositories.UserRepository import UserRepository
from Resources.viewModels.UserSchema import UserSchema
from exceptions.EmailNotFoundException import EmailNotFoundException
from exceptions.PasswordInvalidException import PasswordInvalidException
from Aop.loggingDecorator import loggingDecorator


class LoginService(object):

    _userSchema: UserSchema

    _userRepository: UserRepository

    def __init__(self):
        self._userRepository = UserRepository()
        self._userSchema = UserSchema(only=['id', 'name', 'avatarUrl', 'roles'])

    @loggingDecorator()
    def loginUserService(self, email: str, password: str):

        loginUser = self._userRepository.find(email=email)

        if loginUser is None:
            raise EmailNotFoundException

        if not loginUser.verifyPassword(password):
            raise PasswordInvalidException

        userViewModel = self._userSchema.dump(loginUser)
        app.logger.info('*** user view model: {}'.format(userViewModel))

        return userViewModel
