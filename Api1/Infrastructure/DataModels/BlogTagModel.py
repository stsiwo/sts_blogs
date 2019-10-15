from Configs.extensions import db


tags = db.Table(
        'blogs_tags',
        db.Column(
            'blog_id',
            db.Integer,
            db.ForeignKey('blogs.id'),
            primary_key=True
        ),
        db.Column(
            'tag_id',
            db.Integer,
            db.ForeignKey('tags.id'),
            primary_key=True
            ),
)
