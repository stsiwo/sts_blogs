from Infrastructure.filters.Blog.BlogFilter import BlogFilter
from sqlalchemy.orm.query import Query
from typing import List, Dict
from sqlalchemy import or_


class KeywordBlogFilter(BlogFilter):

    _key: str = 'keyword'

    def __init__(self):
        pass

    def getFilter(self, query: Query, values: Dict) -> Query:
        for value in values['value']:
            if values['orOp']:
                query = query.filter(or_(
                    self._entity.title.contains(value),
                    self._entity.subtitle.contains(value),
                    self._entity.content.contains(value),
                    ))
            else:
                query = query.filter(or_(
                    self._entity.title.contains(value),
                    self._entity.subtitle.contains(value),
                    self._entity.content.contains(value),
                    ))
        return query
