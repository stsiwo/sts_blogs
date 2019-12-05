from Configs.extensions import db


roles = db.Table(
        'users_roles',
        db.Column(
            'id',
            db.Integer,
            primary_key=True
        ),
        db.Column(
            'user_id',
            db.Integer,
            db.ForeignKey('users.id', ondelete='CASCADE'),
        ),
        db.Column(
            'role_id',
            db.Integer,
            db.ForeignKey('roles.id', ondelete='CASCADE'),
            ),
)
