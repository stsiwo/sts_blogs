import utils
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.TagModel import Tag
from Infrastructure.DataModels.CommentModel import Comment


def test_user_can_create_blog(userRolePopulatedSession):

    user = userRolePopulatedSession.query(User).first()

    blog = Blog(
            title='test title',
            content='test content'
            )

    user.blogs.append(blog)

    userRolePopulatedSession.add(user)

    queryBlog = userRolePopulatedSession.query(Blog).filter_by(title='test title').first()

    assert user.id == queryBlog.userId


def test_user_can_create_blog_with_tags(userRoleTagPopulatedSession):

    user = userRoleTagPopulatedSession.query(User).first()
    utils.printObject(user)

    tags = userRoleTagPopulatedSession.query(Tag).all()
    [utils.printObject(tag) for tag in tags]

    blog = Blog(
            title='test title',
            content='test content',
            userId=user.id,
            tags=tags
            )

    user.blogs.append(blog)

    userRoleTagPopulatedSession.add(user)

    queryBlog = userRoleTagPopulatedSession.query(Blog).filter_by(title='test title').first()

    assert tags == queryBlog.tags


def test_user_can_add_comment_on_blog_of_another_user(userRoleTagCommentPopulatedSession):

    blog = userRoleTagCommentPopulatedSession.query(Blog).first()

    comment = Comment(
            title="test title",
            content="test comment content"
            )

    blog.comments.append(comment)

    queryBlog = userRoleTagCommentPopulatedSession.query(Blog).get(blog.id)
    queryComment = userRoleTagCommentPopulatedSession.query(Comment).filter_by(title="test title").first()

    assert [queryComment.id == comment.id for comment in queryBlog.comments if (queryComment.id == comment.id)]
