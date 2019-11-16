from Infrastructure.filters.Blog.BlogFilterBuilder import BlogFilterBuilder
from typing import Dict
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.TagModel import Tag
from utils.util import printObject


# def test_proto_type():
# 
#     test: BlogFilterBuilder = BlogFilterBuilder()
# 
#     test.show()
#     assert 0


def test_tags_filter(exSession, blogsSeededFixture):

    test: BlogFilterBuilder = BlogFilterBuilder()

    printObject(blogsSeededFixture)

    dummyQuery = exSession.query(Blog).join(Blog.tags, aliased=True)
    dummyQS: Dict = {
            'tags': {
                'value': ['js', 'webpack'],
                'orOp': False
                },
            }

    dummyQuery = test.build(dummyQuery, dummyQS)
    filteredBlogs = dummyQuery.all()

    for blog in filteredBlogs:
        assert blog.tags[0].name == 'js'
        assert blog.tags[1].name == 'webpack'


def test_keyword(exSession, blogsSeededFixture):

    test: BlogFilterBuilder = BlogFilterBuilder()

    dummyQuery = exSession.query(Blog).join(Blog.tags, aliased=True)
    dummyQS: Dict = {
            'keyword': {
                'value': ['sample'],
                'orOp': False
                },
            }

    dummyQuery = test.build(dummyQuery, dummyQS)
    print(dummyQuery)
    filteredBlogs = dummyQuery.all()
    printObject(filteredBlogs)

    assert len(filteredBlogs) != 0
    for blog in filteredBlogs:
        assert 'sample' in blog.title or 'sample' in blog.subtitle or 'sample' in blog.content
