from Configs.extensions import db


class Tag(db.Model):

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
