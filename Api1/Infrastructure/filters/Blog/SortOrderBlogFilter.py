from Infrastructure.filters.Blog.BlogFilter import BlogFilter
from sqlalchemy.orm.query import Query
from typing import List, Dict
from sqlalchemy import or_, asc, desc
from utils.util import parseStrToDate

SortMap: Dict = {
        '0': {
            "attr": "createdDate",
            "order": asc
            },
        '1': {
            "attr": "createdDate",
            "order": desc
            },
        '2': {
            "attr": "title",
            "order": asc
            },
        '3': {
            "attr": "title",
            "order": desc
            },
        '4': {
            "attr": "clap",
            "order": asc
            },
        '5': {
            "attr": "clap",
            "order": desc
            },
        }


class SortOrderBlogFilter(BlogFilter):

    _key: str = 'sort'

    def __init__(self):
        pass

    def getFilter(self, query: Query, values: Dict) -> Query:
        sortMap: Dict = SortMap.get(values['value'][0])
        query = query.order_by(sortMap.get('order')(getattr(self._entity, sortMap.get('attr'))))
        return query
