from Infrastructure.DataModels.RoleModel import Role


def generateRoleModel(name: str = 'member'):
    return Role(name=name)
