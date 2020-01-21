from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.TagModel import Tag
from tests.data.generators.UserGenerator import generateUserModel
from tests.data.fakers.faker import fake
import datetime
import pytz
import uuid


def generateBlogModel(
        title=fake.sentence(),
        subtitle=fake.sentence(),
        content=fake.sentence(),
        userId=None,
        user=None,
        tags=[],
        mainImageUrl=None,
        createdDate=fake.date_time_between(start_date="-30y", end_date="now", tzinfo=None),
        blogImages=[],
        ):

    blog = Blog(
            id=str(uuid.uuid4()),
            title=title,
            subtitle=subtitle,
            content=content,
            userId=userId,
            tags=tags,
            mainImageUrl=mainImageUrl,
            createdDate=createdDate,
            blogImages=blogImages
            )

    blog.user = user
    return blog


def generateBlogModelV2(
        title=None,
        subtitle=None,
        content=None,
        user=None,
        clap=None,
        tags=[],
        mainImageUrl=None,
        createdDate=None
        ):

    title = fake.sentence() if title is None else title
    subtitle = fake.sentence() if subtitle is None else subtitle
    content = fake.sentence() if content is None else content
    clap = fake.random_int(min=0, max=100, step=1) if clap is None else clap
    createdDate = fake.past_datetime(start_date="-30y", tzinfo=pytz.timezone('US/Pacific')) if createdDate is None else createdDate
    # need to wrap faker's datetime with pure datetime otherwise mysql complains about it:
    # error: 'datetime' object has no attribute 'translate'
    createdDate = datetime.datetime(year=createdDate.year, month=createdDate.month, day=createdDate.day, hour=createdDate.hour, minute=createdDate.minute, second=createdDate.second, microsecond=createdDate.microsecond, tzinfo=createdDate.tzinfo, fold=createdDate.fold)

    blog = Blog(
            id=str(uuid.uuid4()),
            title=title,
            subtitle=subtitle,
            content='',  # temply empty
            userId=user.id,
            clap=clap,
            tags=tags,
            mainImageUrl=mainImageUrl,
            createdDate=createdDate
            )

    blog.user = user
    return blog
