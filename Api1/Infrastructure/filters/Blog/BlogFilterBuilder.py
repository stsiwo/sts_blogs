from typing import List, Dict
from Infrastructure.filters.Blog.BlogFilter import BlogFilter
from sqlalchemy.orm.query import Query

# need to import all of subclass of this, to use '__subclasses__()'
from Infrastructure.filters.Blog.KeywordBlogFilter import KeywordBlogFilter
from Infrastructure.filters.Blog.TagsBlogFilter import TagsBlogFilter


class BlogFilterBuilder(object):

    _filters: List[BlogFilter]

    def __init__(self):
        self._filters = BlogFilter.__subclasses__()

    def show(self):
        print(self._filters)

    def build(self, query: Query, queryString: Dict) -> Query:
        for blogFilter in self._filters:
            print('before if statement')
            if queryString[blogFilter._key]:
                print('before getFilter')
                query = blogFilter().getFilter(query, queryString[blogFilter._key])
        return query
