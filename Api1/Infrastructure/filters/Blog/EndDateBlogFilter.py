from Infrastructure.filters.Blog.BlogFilter import BlogFilter
from sqlalchemy.orm.query import Query
from typing import List, Dict
from sqlalchemy import or_
from utils.util import parseStrToDate


class EndDateBlogFilter(BlogFilter):

    _key: str = 'endDate'

    def __init__(self):
        pass

    def getFilter(self, query: Query, values: Dict) -> Query:
        for value in values['value']:
            if values['orOp']:
                query = query.filter(or_(self._entity.createdDate <= parseStrToDate(value)))
            else:
                query = query.filter(self._entity.createdDate <= parseStrToDate(value))
        return query
