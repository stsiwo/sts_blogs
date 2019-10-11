from Configs.extensions import db
from passlib.apps import custom_app_context as pwd_context


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
    email = db.Column(db.VARCHAR, unique=True, nullable=False)
    password = db.Column(db.VARCHAR, nullable=False)
    avatarUrl = db.Column(db.VARCHAR, nullable=True)

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)
