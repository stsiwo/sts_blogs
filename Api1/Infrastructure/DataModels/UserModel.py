from Configs.extensions import db
from passlib.apps import custom_app_context as pwd_context
from Infrastructure.DataModels.UserRoleModel import roles
from Infrastructure.DataModels.BaseModel import BaseModel


class User(BaseModel):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
    email = db.Column(db.VARCHAR, unique=True, nullable=False)
    password = db.Column(db.VARCHAR, nullable=False)
    avatarUrl = db.Column(db.VARCHAR, nullable=True)

    roles = db.relationship('Role', secondary=roles, lazy='subquery',
                            backref=db.backref('users', lazy=True))

    # use backref => unidirectional relationship
    # use back_populates => bidirectinal relationship
    # value should be property of target Model (e.g., Blog.user)
    blogs = db.relationship('Blog', back_populates='user', lazy=True)

    comments = db.relationship('Comment', backref='users', lazy=True)

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)
