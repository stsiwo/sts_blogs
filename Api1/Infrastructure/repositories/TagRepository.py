from Infrastructure.DataModels.TagModel import Tag
from typing import List
from Infrastructure.repositories.BaseRepository import BaseRepository


class TagRepository(BaseRepository[Tag]):

    def getAll(self) -> List[Tag]:
        return self._session.query(Tag).all()

    def get(self, name: str) -> Tag:
        """ also use as check tag exists """
        return self._session.query(Tag).filter_by(name=Tag.sanitizeName(name)).first()

    # does not throw exception when tag name does not exist
    def delete(self, name: str) -> None:
        self._session.query(Tag).filter_by(name=name).delete()

    def createIfNotExist(self, name: str) -> Tag:
        tag = self.get(name)
        if tag is None:
            tag = Tag(name=Tag.sanitizeName(name))
            self.add(tag)
        return tag
