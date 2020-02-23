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

    # only public
    def getAll(self, queryString: Dict = {}, userId: str = None, onlyPublic: bool = True) -> Dict:

        # base
        query: Query = self._session.query(Blog).group_by(Blog.id)

        # only public
        if onlyPublic:
            query = query.filter_by(public=True)

        # filters
        # query = self._blogFilterBuilder.build(query, queryString)
        query = query.filter(self._blogFilterBuilder.build(queryString))

        # sort
        sortMap: Dict = SortMap.get(queryString.get('sort', '0'))

        # specific user
        if userId is not None:
            query = query.join(Blog.user, aliased=True).filter_by(id=userId)

        query = query.order_by(sortMap.get('order')(getattr(Blog, sortMap.get('attr'))))

        print('sql query: ')
        print(query)

        # pagination
        pagination: Pagination = query.paginate(page=int(queryString.get('page', 1)), per_page=int(queryString.get('limit', 20)))

        return {
                'page': pagination.page,
                'limit': pagination.per_page,
                'totalCount': pagination.total,
                'blogs': pagination.items,
                }

    def get(self, id: str) -> Blog:
        return self._session.query(Blog).get(id)

    def getIfPublic(self, id: str) -> Blog:
        return self._session.query(Blog).filter_by(id=id, public=True).first()

    def find(self, **kwargs) -> List[Blog]:
        return self._session.query(Blog).filter_by(**kwargs).all()

    def findOnlyOne(self, **kwargs) -> Blog:
        return self._session.query(Blog).filter_by(**kwargs).first()

    def delete(self, id: str):
        return self._session.query(Blog).filter_by(id=id).delete()

    def deleteByUserId(self, userId: str):
        return self._session.query(Blog).filter_by(userId=userId).delete()
