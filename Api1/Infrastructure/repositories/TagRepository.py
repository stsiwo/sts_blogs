from sqlalchemy.orm import Session
from Configs.extensions import db
from Infrastructure.DataModels.TagModel import Tag
from typing import List


class TagRepository(object):

    _session: Session

    def __init__(self):
        self._session = db.session

    def getAll(self) -> List[Tag]:
        return self._session.query(Tag).all()

    def get(self, name: str) -> Tag:
        return self._session.query(Tag).filter_by(name=Tag.sanitizeName(name)).first()

    # should avoid throw name unique constraint violation
    # does not really matter if tag is created successfully or not
    def create(self, name: str):
        if not self.isExist(name):
            self._session.add(Tag(name=Tag.sanitizeName(name)))

    def isExist(self, name: str) -> bool:
        return True if self._session.query(Tag).filter_by(name=Tag.sanitizeName(name)).first() is not None else False
