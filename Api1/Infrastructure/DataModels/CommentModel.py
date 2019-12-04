from Configs.extensions import db
from Infrastructure.DataModels.BaseModel import BaseModel


class Comment(BaseModel):

    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.VARCHAR(16), nullable=False)
    content = db.Column(db.Text, nullable=False)

    blogId = db.Column(db.Integer, db.ForeignKey('blogs.id'), nullable=False)

    authorId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
