from Configs.extensions import db
from Infrastructure.DataModels.BlogTagModel import tags


class Blog(db.Model):

    __tablename__ = 'blogs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.VARCHAR, nullable=False)
    content = db.Column(db.VARCHAR, unique=True, nullable=False)

    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    tags = db.relationship(
            'Tag',
            secondary=tags,
            lazy='subquery',
            backref=db.backref('blogs', lazy=True))

    comments = db.relationship('Comment', backref='blogs', lazy='subquery')
