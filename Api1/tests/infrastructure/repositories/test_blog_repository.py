from Infrastructure.repositories.BlogRepository import BlogRepository
from Infrastructure.DataModels.BlogModel import Blog
from utils.util import printObject


def test_br1_get_all(blogsSeededFixture):

    blogRepo = BlogRepository()

    blogs = blogRepo.getAll()

    assert len(blogs) != 0


def test_br2_get(blogsSeededFixture):

    blogRepo = BlogRepository()

    blog = blogRepo.get(2)

    assert blog.id == 2


def test_br8_delete(exSession, blogsSeededFixture):

    blog = blogsSeededFixture[0]

    blogRepo = BlogRepository()

    blogRepo.delete(blog.id)

    exSession.commit()

    deletedBlog = blogRepo.get(blog.id)

    assert deletedBlog is None
