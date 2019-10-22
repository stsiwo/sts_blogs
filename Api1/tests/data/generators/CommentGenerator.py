from Infrastructure.DataModels.CommentModel import Comment
from tests.data.fakers.faker import fake


def generateCommentModel(
        id=1,
        title=fake.sentence(),
        content=fake.sentence(),
        blogId=None,
        authorId=None
        ):

    comment = Comment(
            id=id,
            title=title,
            content=content,
            blogId=blogId,
            authorId=authorId
            )

    return comment
