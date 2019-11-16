from Configs.extensions import db
from Infrastructure.DataModels.BlogTagModel import tags
from Infrastructure.DataModels.BaseModel import BaseModel


class Blog(BaseModel):

    __tablename__ = 'blogs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.VARCHAR, nullable=False)
    subtitle = db.Column(db.VARCHAR, nullable=False)
    mainImageUrl = db.Column(db.VARCHAR, nullable=True)
    content = db.Column(db.VARCHAR, nullable=False)

    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    tags = db.relationship(
            'Tag',
            secondary=tags,
            lazy='subquery',
            backref=db.backref('blogs', lazy=True))

    comments = db.relationship('Comment', backref='blogs', lazy='subquery', cascade="all, delete-orphan")

    # reverse relational to User
    user = db.relationship('User', back_populates='blogs', lazy='subquery')
