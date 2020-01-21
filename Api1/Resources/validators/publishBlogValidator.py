from Configs.app import app
from Resources.validators.base.publishBlogParser import publishBlogParser


def publishBlogValidator():
    app.logger.info("start validating publish blog input ...")
    print("start validating publish blog input ...")
    parser = publishBlogParser()
    args = parser.parse_args(strict=True)
