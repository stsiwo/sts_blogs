from Configs.extensions import db
from Infrastructure.DataModels.BaseModel import BaseModel
from sqlalchemy.types import CHAR


class BlogImage(BaseModel):

    __tablename__ = 'blog_image'

    path = db.Column(db.VARCHAR(1000), primary_key=True)
    blogId = db.Column(CHAR(36), db.ForeignKey('blogs.id', name="FK_blog_image__blogs", ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
