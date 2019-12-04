from flask.cli import AppGroup
from Configs.extensions import db
from Infrastructure.DataModels.RoleModel import Role


seed_cli = AppGroup('seed')


@seed_cli.command('roles')
def add_roles():
    db.session.add(Role(name='admin'))
    db.session.add(Role(name='member'))
    db.session.commit()
