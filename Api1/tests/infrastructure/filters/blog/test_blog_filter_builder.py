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


def test_build(exSession, blogsSeededFixture):

    test: BlogFilterBuilder = BlogFilterBuilder()

    blogs = exSession.query(Blog).all()

    for blog in blogs:
        printObject(blog)

    dummyQuery = exSession.query(Blog).join(Blog.tags, aliased=True)
    dummyQS: Dict = {
            'keyword': {
                'value': ['test-keyword'],
                'orOp': False
                },
            'tags': {
                'value': ['test-tag1', 'test-tag2', 'test-tag3'],
                'orOp': False
                },
            }

    dummyQuery = test.build(dummyQuery, dummyQS)

    print(dummyQuery)
    assert 0
