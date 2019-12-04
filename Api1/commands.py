from flask.cli import AppGroup
from Configs.extensions import db
from Infrastructure.DataModels.RoleModel import Role
from Infrastructure.DataModels.TagModel import Tag


seed_cli = AppGroup('seed')


@seed_cli.command('roles')
def add_roles():
    db.session.add(Role(name='admin'))
    db.session.add(Role(name='member'))
    db.session.commit()


@seed_cli.command('tags')
def add_tags():
    db.session.add(Tag(name='ui'))
    db.session.add(Tag(name='frontend'))
    db.session.add(Tag(name='backend'))
    db.session.add(Tag(name='css'))
    db.session.add(Tag(name='sql'))
    db.session.add(Tag(name='python'))
    db.session.add(Tag(name='typescript'))
    db.session.add(Tag(name='react'))
    db.session.add(Tag(name='angular'))
    db.session.add(Tag(name='sqlalchemy'))
    db.session.add(Tag(name='php'))
    db.session.add(Tag(name='laravel'))
    db.session.add(Tag(name='flask'))
    db.session.add(Tag(name='django'))
    db.session.add(Tag(name='oop'))
    db.session.add(Tag(name='designpattern'))
    db.session.add(Tag(name='nodejs'))
    db.session.add(Tag(name='csharp'))
    db.session.add(Tag(name='autofac'))
    db.session.add(Tag(name='unittesting'))
    db.session.add(Tag(name='mock'))
    db.session.add(Tag(name='pytest'))
    db.session.add(Tag(name='webpack'))
    db.session.add(Tag(name='js'))
    db.session.commit()
