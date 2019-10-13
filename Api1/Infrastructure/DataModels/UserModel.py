from Configs.extensions import db
from passlib.apps import custom_app_context as pwd_context


roles = db.Table(
        'users_roles',
        db.Column(
            'user_id',
            db.Integer,
            db.ForeignKey('users.id'),
            primary_key=True
        ),
        db.Column(
            'role_id',
            db.Integer,
            db.ForeignKey('roles.id'),
            primary_key=True
            ),
)


class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
    email = db.Column(db.VARCHAR, unique=True, nullable=False)
    password = db.Column(db.VARCHAR, nullable=False)
    avatarUrl = db.Column(db.VARCHAR, nullable=True)

    roles = db.relationship('Role', secondary=roles, lazy='subquery',
                            backref=db.backref('users', lazy=True))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)
