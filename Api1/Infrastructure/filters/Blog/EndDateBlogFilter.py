from Infrastructure.filters.Blog.BlogFilter import BlogFilter
from typing import List, Dict
from sqlalchemy import or_, and_
from utils.util import parseStrToDate


class EndDateBlogFilter(BlogFilter):

    _key: str = 'endDate'

    def __init__(self):
        pass

    def getFilter(self, values: Dict):
        filterExpression = True
        for value in values['value']:
            if values['orOp']:  # don't use this for now
                filterExpression = or_(filterExpression, self._entity.createdDate <= parseStrToDate(value))
            else:
                filterExpression = and_(filterExpression, self._entity.createdDate <= parseStrToDate(value))
        return filterExpression
