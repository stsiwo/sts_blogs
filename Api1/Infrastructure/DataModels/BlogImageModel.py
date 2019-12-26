from Configs.extensions import db
from Infrastructure.DataModels.BaseModel import BaseModel


class BlogImage(BaseModel):

    __tablename__ = 'blog_image'

    path = db.Column(db.VARCHAR(1000), primary_key=True)
    blogId = db.Column(db.Integer, db.ForeignKey('blogs.id'), nullable=False)
