from Infrastructure.repositories.BlogRepository import BlogRepository
from Infrastructure.DataModels.BlogModel import Blog
from utils.util import printObject
import pytest
from typing import Dict


@pytest.mark.blog_repo
def test_br1_get_all_should_return_orOp_filtered_pagination_object(blogsSeededFixture):

    blogRepo = BlogRepository()
    dummyQS: Dict = {
            'orOp': True,
            'tags': {
                'value': ['react'],
                'orOp': False
                },
            'keyword': {
                'value': ['no'],
                'orOp': False
                },
            }

    result = blogRepo.getAll(dummyQS)

    printObject(result)

    assert len(result['data']) != 0
    for blog in result['data']:
        assert any(tag.name == 'react' for tag in blog.tags)


@pytest.mark.blog_repo
def test_br1_get_all_should_return_no_orOp_filtered_pagination_object(blogsSeededFixture):

    blogRepo = BlogRepository()
    dummyQS: Dict = {
            'orOp': False,
            'tags': {
                'value': ['react'],
                'orOp': False
                },
            'startDate': {
                'value': ['2003-01-01T00:00:00.000Z'],
                'orOp': False
                },
            }

    result = blogRepo.getAll(dummyQS)

    printObject(result)

    assert len(result['data']) != 0
    for blog in result['data']:
        assert any(tag.name == 'react' for tag in blog.tags)


@pytest.mark.blog_repo
def test_br2_get(blogsSeededFixture):

    blogRepo = BlogRepository()

    blog = blogRepo.get(2)

    assert blog.id == 2


@pytest.mark.blog_repo
def test_ur3_find(blogsSeededFixture):

    blogRepo = BlogRepository()

    blogs = blogRepo.find(
            userId=2
            )

    assert len(blogs) != 0


@pytest.mark.blog_repo
def test_ur4_find_should_return_none_when_one_of_arg_is_wrong(blogsSeededFixture):

    blogRepo = BlogRepository()

    blogs = blogRepo.find(
            userId=3232
            )

    assert len(blogs) == 0


@pytest.mark.blog_repo
def test_br8_delete(exSession, blogsSeededFixture):

    blog = blogsSeededFixture[0]

    blogRepo = BlogRepository()

    blogRepo.delete(blog.id)

    exSession.commit()

    deletedBlog = blogRepo.get(blog.id)

    assert deletedBlog is None


@pytest.mark.blog_repo
def test_br8_deleteByUserId(exSession, blogsSeededFixture):

    blogRepo = BlogRepository()

    blogs = blogRepo.find(userId=2)

    assert len(blogs) != 0

    # test user id = 2
    blogRepo.deleteByUserId(2)

    exSession.commit()

    deletedBlog = blogRepo.find(userId=2)

    assert len(deletedBlog) == 0
