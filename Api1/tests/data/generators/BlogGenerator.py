from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.TagModel import Tag
from tests.data.generators.UserGenerator import generateUserModel
from tests.data.fakers.faker import fake
import datetime
import pytz


def generateBlogModel(
        id=1,
        title=fake.sentence(),
        subtitle=fake.sentence(),
        content=fake.sentence(),
        userId=None,
        user=None,
        tags=[],
        mainImageUrl=None,
        createdDate=fake.date_time_between(start_date="-30y", end_date="now", tzinfo=None)
        ):

    blog = Blog(
            id=id,
            title=title,
            subtitle=subtitle,
            content=content,
            userId=userId,
            tags=tags,
            mainImageUrl=mainImageUrl,
            createdDate=createdDate
            )

    blog.user = user
    return blog


def generateBlogModelV2(
        title=None,
        subtitle=None,
        content=None,
        user=None,
        tags=[],
        mainImageUrl=None,
        createdDate=None
        ):

    title = fake.sentence() if title is None else title
    subtitle = fake.sentence() if subtitle is None else subtitle
    content = fake.sentence() if content is None else content
    createdDate = fake.past_datetime(start_date="-30y", tzinfo=pytz.timezone('US/Pacific')) if createdDate is None else createdDate
    createdDate = datetime.datetime(year=createdDate.year, month=createdDate.month, day=createdDate.day, hour=createdDate.hour, minute=createdDate.minute, second=createdDate.second, microsecond=createdDate.microsecond, tzinfo=createdDate.tzinfo, fold=createdDate.fold)

    blog = Blog(
            title=title,
            subtitle=subtitle,
            content='',  # temply empty
            userId=user.id,
            tags=tags,
            mainImageUrl=mainImageUrl,
            createdDate=createdDate
            )

    blog.user = user
    return blog
