from sqlalchemy.orm import Session
from Configs.extensions import db
from Infrastructure.DataModels.BlogModel import Blog
from typing import List, Dict


class BlogRepository(object):

    _session: Session

    def __init__(self):
        self._session = db.session

    def getAll(self) -> List[Blog]:
        return self._session.query(Blog).all()

    def get(self, id: str) -> Blog:
        return self._session.query(Blog).get(id)

    def add(self, blog: Blog) -> None:
        self._session.add(blog)

    def delete(self, id: str):
        self._session.query(Blog).filter_by(id=id).delete()

    def deleteByEmail(self, email: str):
        self._session.query(Blog).filter_by(email=email).delete()
