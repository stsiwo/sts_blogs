from Configs.extensions import db
from Infrastructure.DataModels.UserRoleModel import roles
from Infrastructure.DataModels.BaseModel import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from Configs.extensions import bcrypt
from typing import Dict
from utils.util import printObject


class User(BaseModel):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR(1000), nullable=False)
    email = db.Column(db.VARCHAR(1000), unique=True, nullable=False)
    _password = db.Column('password', db.VARCHAR(1000), nullable=False)
    avatarUrl = db.Column(db.VARCHAR(1000), nullable=True)

    roles = db.relationship('Role', secondary=roles, lazy='subquery',
                            backref=db.backref('users', lazy=True))

    # use backref => unidirectional relationship
    # use back_populates => bidirectinal relationship
    # value should be property of target Model (e.g., Blog.user)
    blogs = db.relationship('Blog', back_populates='user', lazy=True)

    comments = db.relationship('Comment', backref='users', lazy=True)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password: str):
        self._password = bcrypt.generate_password_hash(password).decode('utf-8')
        return self._password

    @hybrid_method
    def verifyPassword(self, password: str):
        return bcrypt.check_password_hash(self.password, password)

    @password.expression
    def password(cls):
        return cls._password
