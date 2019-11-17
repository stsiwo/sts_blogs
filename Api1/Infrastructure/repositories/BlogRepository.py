from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.repositories.BaseRepository import BaseRepository
from typing import List, Dict
from Infrastructure.filters.Blog.BlogFilterBuilder import BlogFilterBuilder
from sqlalchemy.orm.query import Query
from flask_sqlalchemy import Pagination


class BlogRepository(BaseRepository[Blog]):

    _blogFilterBuilder: BlogFilterBuilder

    def __init__(self):
        super().__init__()
        self._blogFilterBuilder = BlogFilterBuilder()

    def getAll(self, queryString: Dict = {}) -> Dict:
        query: Query = self._session.query(Blog).group_by(Blog.id)
        query = self._blogFilterBuilder.build(query, queryString)
        pagination: Pagination = query.paginate(page=int(queryString.get('page', 1)), per_page=int(queryString.get('limit', 20)))
        return {
                'page': pagination.page,
                'limit': pagination.per_page,
                'totalCount': pagination.total,
                'data': pagination.items,
                }

    def get(self, id: str) -> Blog:
        return self._session.query(Blog).get(id)

    def find(self, **kwargs) -> List[Blog]:
        return self._session.query(Blog).filter_by(**kwargs).all()

    def delete(self, id: str):
        return self._session.query(Blog).filter_by(id=id).delete()

    def deleteByUserId(self, userId: str):
        return self._session.query(Blog).filter_by(userId=userId).delete()
