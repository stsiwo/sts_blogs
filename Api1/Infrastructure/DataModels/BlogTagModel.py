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
            'tag_name',
            db.VARCHAR(1000),
            db.ForeignKey('tags.name'),
            primary_key=True
            ),
)
