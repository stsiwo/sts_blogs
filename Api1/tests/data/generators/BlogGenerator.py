from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.TagModel import Tag
from tests.data.generators.UserGenerator import generateUserModel
from tests.data.fakers.faker import fake


def generateBlogModel(
        id=1,
        title=fake.sentence(),
        subtitle=fake.sentence(),
        content=fake.sentence(),
        userId=None,
        user=None,
        tags=[],
        createdDate=fake.date_time_between(start_date="-30y", end_date="now", tzinfo=None)
        ):

    blog = Blog(
            id=id,
            title=title,
            subtitle=subtitle,
            content=content,
            userId=userId,
            tags=tags,
            createdDate=createdDate
            )

    blog.user = user
    return blog
