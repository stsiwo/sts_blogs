from Configs.extensions import db
from Infrastructure.DataModels.BaseModel import BaseModel


class Role(BaseModel):

    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR(16), nullable=False)
