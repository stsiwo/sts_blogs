from Infrastructure.DataModels.BlogModel import Blog
from tests.data.generators.UserGenerator import generateUserModel
from tests.data.fakers.faker import fake

id = 0


def generateBlogModel():

    global id
    id += 1

    user = generateUserModel()
    blog = Blog(
            id=id,
            title=fake.sentence(),
            content=fake.sentence(),
            userId=user.id
            )

    blog.user = user
    return blog
