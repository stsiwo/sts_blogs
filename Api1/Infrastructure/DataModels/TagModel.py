from Configs.extensions import db
from Infrastructure.DataModels.BaseModel import BaseModel


class Tag(BaseModel):

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
