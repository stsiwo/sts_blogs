from Infrastructure.DataModels.BlogImageModel import BlogImage
from typing import List
from Infrastructure.repositories.BaseRepository import BaseRepository


class BlogImageRepository(BaseRepository[BlogImage]):

    def getAll(self) -> List[BlogImage]:
        return self._session.query(BlogImage).all()

    def get(self, path: str) -> BlogImage:
        """ also use as check blogImage exists """
        return self._session.query(BlogImage).filter_by(path=path).first()

    # does not throw exception when blogImage path does not exist
    def delete(self, path: str) -> None:
        self._session.query(BlogImage).filter_by(path=path).delete()

    def createIfNotExist(self, path: str) -> BlogImage:
        blogImage = self.get(path)
        if blogImage is None:
            blogImage = BlogImage(path=path)
            self.add(blogImage)
        return blogImage
