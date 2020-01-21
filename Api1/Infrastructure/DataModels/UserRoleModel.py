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
            db.ForeignKey('users.id', name="FK_users_roles__users", ondelete='CASCADE', onupdate='CASCADE')
        ),
        db.Column(
            'role_id',
            db.Integer,
            db.ForeignKey('roles.id', name="FK_users_roles__roles", ondelete='CASCADE', onupdate='CASCADE'),
            ),
)
