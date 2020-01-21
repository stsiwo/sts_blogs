from Configs.extensions import db
from Infrastructure.DataModels.BaseModel import BaseModel
from sqlalchemy.types import CHAR


class Comment(BaseModel):

    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.VARCHAR(1000), nullable=False)
    content = db.Column(db.Text, nullable=False)

    blogId = db.Column(CHAR(32), db.ForeignKey('blogs.id', name="FK_comments__blogs", ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    authorId = db.Column(CHAR(32), db.ForeignKey('users.id', name="FK_comments__users", ondelete='CASCADE', onupdate='CASCADE'), nullable=True)

    # TODO: author relationship
    # https://app.clickup.com/t/3m558t
