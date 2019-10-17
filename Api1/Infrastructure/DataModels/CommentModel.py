from Configs.extensions import db
from Infrastructure.DataModels.BaseModel import BaseModel


class Comment(BaseModel):

    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.VARCHAR, nullable=False)
    content = db.Column(db.VARCHAR, unique=True, nullable=False)

    blogId = db.Column(db.Integer, db.ForeignKey('blogs.id'), nullable=False)

    authorId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
