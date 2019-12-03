from typing import List, Dict
from Infrastructure.filters.Blog.BlogFilter import BlogFilter
from sqlalchemy import and_, or_

# need to import all of subclass of this, to use '__subclasses__()'
from Infrastructure.filters.Blog.KeywordBlogFilter import KeywordBlogFilter
from Infrastructure.filters.Blog.TagsBlogFilter import TagsBlogFilter
from Infrastructure.filters.Blog.StartDateBlogFilter import StartDateBlogFilter
from Infrastructure.filters.Blog.EndDateBlogFilter import EndDateBlogFilter


class BlogFilterBuilder(object):

    _filters: List[BlogFilter]

    def __init__(self):
        self._filters = BlogFilter.__subclasses__()

    def show(self):
        print(self._filters)

    def build(self, queryString: Dict):
        filterExpression = True
        for blogFilter in self._filters:
            if queryString.get(blogFilter._key, None) is not None:
                if queryString.get('orOp') is True:
                    filterExpression = False  # need this one otherwise always return all blogs
                    filterExpression = or_(filterExpression, blogFilter().getFilter(queryString[blogFilter._key]))
                else:
                    filterExpression = and_(filterExpression, blogFilter().getFilter(queryString[blogFilter._key]))
        return filterExpression
