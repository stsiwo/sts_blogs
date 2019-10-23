from flask_sqlalchemy import SQLAlchemy
from Infrastructure.DataModels.RoleModel import Role


def seed(db: SQLAlchemy):
    # initial role model data
    db.session.bulk_save_objects(
            [
                Role(name='admin'),
                Role(name='member')
            ])
