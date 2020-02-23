import pytest
from Infrastructure.DataModels.BlogModel import Blog
from Resources.viewModels.BlogSchema import BlogSchema
pytestmark = [pytest.mark.view_model, pytest.mark.blog_view_model]


def test_blog_view_model_should_return_appropriate_view_model(blogsSeededFixture):

    blog: Blog = blogsSeededFixture[0]
    blogSchema: BlogSchema = BlogSchema()
    blogViewModel = blogSchema.dump(blog)

    assert 'id' in blogViewModel.keys()
    assert 'title' in blogViewModel.keys()
    assert 'subtitle' in blogViewModel.keys()
    assert 'mainImageUrl' in blogViewModel.keys()
    assert 'content' in blogViewModel.keys()
    assert 'clap' in blogViewModel.keys()
    assert 'author' in blogViewModel.keys()
    assert 'id' in blogViewModel.get('author').keys()
    assert 'name' in blogViewModel.get('author').keys()
    assert 'avatarUrl' in blogViewModel.get('author').keys()
    assert 'comments' in blogViewModel.keys()
    assert 'tags' in blogViewModel.keys()
    # remove this property from schema since does not need it
    # assert 'blogImages' in blogViewModel.keys()
