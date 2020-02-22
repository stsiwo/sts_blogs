from Configs.extensions import db
from sqlalchemy.sql import func


class BaseModel(db.Model):

    __abstract__ = True

    createdDate = db.Column('created_date', db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedDate = db.Column('updated_date', db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    deleted = db.Column(db.Boolean, server_default='0', nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)
