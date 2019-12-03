from Infrastructure.filters.Blog.BlogFilter import BlogFilter
from sqlalchemy.orm.query import Query
from typing import List, Dict
from sqlalchemy import or_, and_


class KeywordBlogFilter(BlogFilter):

    _key: str = 'keyword'

    def __init__(self):
        pass

    def getFilter(self, values: Dict):
        filterExpression = True
        for value in values['value']:
            if values['orOp']:
                filterExpression = or_(filterExpression, or_(
                    self._entity.title.contains(value),
                    self._entity.subtitle.contains(value),
                    self._entity.content.contains(value),
                    ))
            else:
                filterExpression = and_(filterExpression, or_(
                    self._entity.title.contains(value),
                    self._entity.subtitle.contains(value),
                    self._entity.content.contains(value),
                    ))
        return filterExpression
