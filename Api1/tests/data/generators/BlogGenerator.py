from Infrastructure.DataModels.BlogModel import Blog
from tests.data.generators.UserGenerator import generateUserModel
from tests.data.fakers.faker import fake


def generateBlogModel(
        id=1,
        title=fake.sentence(),
        content=fake.sentence(),
        userId=None,
        user=None
        ):

    blog = Blog(
            id=id,
            title=title,
            content=content,
            userId=userId
            )

    blog.user = user
    return blog
