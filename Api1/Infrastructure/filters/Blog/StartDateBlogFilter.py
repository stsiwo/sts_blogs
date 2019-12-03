from Infrastructure.filters.Blog.BlogFilter import BlogFilter
from sqlalchemy.orm.query import Query
from typing import List, Dict
from sqlalchemy import or_, and_
from utils.util import parseStrToDate


class StartDateBlogFilter(BlogFilter):

    _key: str = 'startDate'

    def __init__(self):
        pass

    def getFilter(self, values: Dict) -> Query:
        filterExpression = True
        for value in values['value']:
            if values['orOp']:
                filterExpression = or_(filterExpression, self._entity.createdDate >= parseStrToDate(value))
            else:
                filterExpression = and_(filterExpression, self._entity.createdDate >= parseStrToDate(value))
        return filterExpression
