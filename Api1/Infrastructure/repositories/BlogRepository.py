from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.repositories.BaseRepository import BaseRepository
from typing import List


class BlogRepository(BaseRepository[Blog]):

    def getAll(self) -> List[Blog]:
        return self._session.query(Blog).all()

    def get(self, id: str) -> Blog:
        return self._session.query(Blog).get(id)

    def delete(self, id: str):
        self._session.query(Blog).filter_by(id=id).delete()
