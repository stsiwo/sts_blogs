from Infrastructure.DataModels.UserModel import User
from tests.data.generators.RoleGenerator import generateRoleModel
from tests.data.fakers.faker import fake

id = 0


def generateUserModel():

    global id
    id += 1
    user = User(
            id=id,
            name=fake.name(),
            email=fake.email(),
            password=fake.password(),
            avatarUrl=fake.url(),
            )

    user.roles.append(generateRoleModel())
    return user
