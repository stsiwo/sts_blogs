from Configs.extensions import db
from Infrastructure.DataModels.BaseModel import BaseModel


class Tag(BaseModel):

    __tablename__ = 'tags'

    name = db.Column(db.VARCHAR(1000), primary_key=True)

    # lower-case and remove space
    @staticmethod
    def sanitizeName(name: str):
        return name.lower().split()[0]
