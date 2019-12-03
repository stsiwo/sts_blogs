from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.repositories.BaseRepository import BaseRepository
from typing import List, Dict
from Infrastructure.filters.Blog.BlogFilterBuilder import BlogFilterBuilder
from sqlalchemy.orm.query import Query
from flask_sqlalchemy import Pagination
from sqlalchemy import or_
from domain.blog.sort import SortMap


class BlogRepository(BaseRepository[Blog]):

    _blogFilterBuilder: BlogFilterBuilder

    def __init__(self):
        super().__init__()
        self._blogFilterBuilder = BlogFilterBuilder()

    def getAll(self, queryString: Dict = {}) -> Dict:

        # base
        query: Query = self._session.query(Blog).group_by(Blog.id)

        # filters
        # query = self._blogFilterBuilder.build(query, queryString)
        query = query.filter(self._blogFilterBuilder.build(queryString))

        # sort
        sortMap: Dict = SortMap.get(queryString.get('sort', '0'))
        query = query.order_by(sortMap.get('order')(getattr(Blog, sortMap.get('attr'))))

        print('sql query: ')
        print(query)

        # pagination
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
