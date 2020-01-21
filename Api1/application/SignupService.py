from Configs.app import app
from Infrastructure.DataModels.UserModel import User
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.repositories.RoleRepository import RoleRepository
from Infrastructure.repositories.UserRepository import UserRepository
from Resources.viewModels.UserSchema import UserSchema
import uuid


class SignupService(object):

    _roleRepository: RoleRepository

    _userRepository: UserRepository

    _userSchema: UserSchema

    def __init__(self):
        self._roleRepository = RoleRepository()
        self._userRepository = UserRepository()
        self._userSchema = UserSchema(only=['id', 'name', 'avatarUrl', 'roles'])

    @db_transaction()
    def registerUserService(self, name: str, email: str, password: str):
        app.logger.info("start register user service")
        print("start register user service")

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
