from Infrastructure.DataModels.UserModel import User
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.repositories.RoleRepository import RoleRepository
from Infrastructure.repositories.UserRepository import UserRepository
from Resources.viewModels.UserSchema import UserSchema
from exceptions.UserAlreadyExistException import UserAlreadyExistException
import uuid
from Aop.loggingDecorator import loggingDecorator


class SignupService(object):

    _roleRepository: RoleRepository

    _userRepository: UserRepository

    _userSchema: UserSchema

    def __init__(self):
        self._roleRepository = RoleRepository()
        self._userRepository = UserRepository()
        self._userSchema = UserSchema(only=['id', 'name', 'avatarUrl', 'roles'])

    @db_transaction()
    @loggingDecorator()
    def registerUserService(self, name: str, email: str, password: str):

        # check newUser already exists in db
        isExist = self._userRepository.getByEmail(email)

        if isExist is not None:
            raise UserAlreadyExistException

        # get 'member' role from db
        memberRole = self._roleRepository.get('member')

        # create new User
        newUser = User(
                id=str(uuid.uuid4()),
                name=name,
                email=email,
                password=password,
                roles=[memberRole]
                )

        # flush to generate id for new user but not commit yet
        # do i need to add()??
        self._userRepository.flush()

        userViewModel = self._userSchema.dump(newUser)

        return userViewModel
