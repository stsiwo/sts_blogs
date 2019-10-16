from tests.data.factories.BlogFactory import BlogFactory
from Infrastructure.DataModels.BlogModel import Blog
import utils


def test_blog_relationship(session):

    blog = BlogFactory()

    session.add(blog)

    queryBlog = session.query(Blog).all()

    utils.printObject(queryBlog)

    assert 0
