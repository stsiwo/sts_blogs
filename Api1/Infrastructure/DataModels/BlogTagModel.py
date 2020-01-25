from Configs.extensions import db

tags = db.Table(
        'blogs_tags',
        db.Column(
            'id',
            db.Integer,
            primary_key=True
        ),
        db.Column(
            'blog_id',
            db.Integer,
            db.ForeignKey('blogs.id', name="FK_comments__users", ondelete='CASCADE', onupdate='CASCADE'),
        ),
        db.Column(
            'tag_name',
            db.VARCHAR(1000),
            db.ForeignKey('tags.name', name="FK_comments__users", ondelete="CASCADE", onupdate='CASCADE'),
            ),
)
