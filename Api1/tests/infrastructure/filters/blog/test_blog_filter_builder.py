from Infrastructure.filters.Blog.BlogFilterBuilder import BlogFilterBuilder
from typing import Dict
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.TagModel import Tag
from utils.util import printObject
from utils.util import parseStrToDate, _printObject


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


def test_start_date(exSession, blogsSeededFixture):

    test: BlogFilterBuilder = BlogFilterBuilder()

    dummyQuery = exSession.query(Blog).join(Blog.tags, aliased=True)
    dummyQS: Dict = {
            'startDate': {
                'value': ['2003-01-01T00:00:00.000Z'],
                'orOp': False
                },
            }

    dummyQuery = test.build(dummyQuery, dummyQS)
    print(dummyQuery)
    filteredBlogs = dummyQuery.all()
    printObject(filteredBlogs)

    assert len(filteredBlogs) != 0
    for blog in filteredBlogs:
        assert blog.createdDate >= parseStrToDate('2003-01-01T00:00:00.000Z')


def test_end_date(exSession, blogsSeededFixture):

    test: BlogFilterBuilder = BlogFilterBuilder()

    dummyQuery = exSession.query(Blog).join(Blog.tags, aliased=True)
    dummyQS: Dict = {
            'endDate': {
                'value': ['2001-01-01T00:00:00.000Z'],
                'orOp': False
                },
            }

    dummyQuery = test.build(dummyQuery, dummyQS)
    print(dummyQuery)
    filteredBlogs = dummyQuery.all()
    printObject(filteredBlogs)

    assert len(filteredBlogs) != 0
    for blog in filteredBlogs:
        assert blog.createdDate <= parseStrToDate('2001-01-01T00:00:00.000Z')


def test_sort(exSession, blogsSeededFixture):

    test: BlogFilterBuilder = BlogFilterBuilder()

    dummyQuery = exSession.query(Blog).join(Blog.tags, aliased=True)
    dummyQS: Dict = {
            'sort': {
                'value': ['1'],
                'orOp': False
                },
            }

    dummyQuery = test.build(dummyQuery, dummyQS)
    print(dummyQuery)
    filteredBlogs = dummyQuery.all()
    printObject(filteredBlogs)

    assert len(filteredBlogs) == 6
    assert all(filteredBlogs[i].createdDate > filteredBlogs[i+1].createdDate for i in range(len(filteredBlogs) - 1))


def test_paginate(exSession, blogsSeededFixture):

    test: BlogFilterBuilder = BlogFilterBuilder()

    allBlogs = exSession.query(Blog).all()

    # need group_by to remove duplication by 'join' tag
    dummyQuery = exSession.query(Blog).join(Blog.tags, aliased=True).group_by(Blog.id)
    dummyQS: Dict = {
            'page': {
                'value': ['2'],
                'orOp': False
                },
            'limit': {
                'value': ['3'],
                'orOp': False
                },
            }

    dummyQuery = test.build(dummyQuery, dummyQS)
    print(dummyQuery)
    filteredBlogs = dummyQuery.paginate(page=int(dummyQS['page']['value'][0]), max_per_page=int(dummyQS['limit']['value'][0]))
    _printObject(filteredBlogs)

    assert len(filteredBlogs.items) == 3
    assert filteredBlogs.total == 6
