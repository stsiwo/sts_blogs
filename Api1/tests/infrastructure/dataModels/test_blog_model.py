from utils.util import printObject
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.TagModel import Tag
from Infrastructure.DataModels.CommentModel import Comment


def test_user_can_create_blog(exSession, usersSeededFixture):

    user = exSession.query(User).first()

    blog = Blog(
            title='test title',
            content='test content'
            )

    user.blogs.append(blog)

    exSession.add(user)
    exSession.commit()

    queryBlog = exSession.query(Blog).filter_by(title='test title').first()

    assert user.id == queryBlog.userId


def test_user_can_create_blog_with_tags(exSession, usersSeededFixture):

    user = exSession.query(User).first()

    tags = exSession.query(Tag).all()

    blog = Blog(
            title='test title',
            content='test content',
            userId=user.id,
            tags=tags
            )

    user.blogs.append(blog)
    exSession.add(user)
    exSession.commit()

    queryBlog = exSession.query(Blog).filter_by(title='test title').first()

    assert tags == queryBlog.tags


def test_user_can_add_comment_on_blog_of_another_user(exSession, blogsSeededFixture):

    blog = exSession.query(Blog).first()

    comment = Comment(
            title="test title",
            content="test comment content"
            )

    blog.comments.append(comment)

    queryBlog = exSession.query(Blog).get(blog.id)
    queryComment = exSession.query(Comment).filter_by(title="test title").first()

    assert [queryComment.id == comment.id for comment in queryBlog.comments if (queryComment.id == comment.id)]
