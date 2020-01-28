from Configs.extensions import db
from sqlalchemy.types import CHAR

tags = db.Table(
        'blogs_tags',
        db.Column(
            'id',
            db.Integer,
            primary_key=True
        ),
        db.Column(
            'blog_id',
            CHAR(36),
            db.ForeignKey('blogs.id', name="FK_blogs_tags__blogs", ondelete='CASCADE', onupdate='CASCADE'),
        ),
        db.Column(
            'tag_name',
            db.VARCHAR(1000),
            db.ForeignKey('tags.name', name="FK_blogs_tags__tags", ondelete="CASCADE", onupdate='CASCADE'),
            ),
)
