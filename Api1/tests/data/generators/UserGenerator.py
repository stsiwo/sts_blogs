from Infrastructure.DataModels.UserModel import User
from tests.data.fakers.faker import fake
import uuid


def generateUserModel(
        id=str(uuid.uuid4()),
        name=fake.name(),
        email=fake.email(),
        password=fake.password(),
        avatarUrl=fake.url(),
        roles=None
        ):

    user = User(
            id=id,
            name=name,
            email=email,
            password=password,
            avatarUrl=avatarUrl
            )

    user.roles.extend(roles)
    return user
