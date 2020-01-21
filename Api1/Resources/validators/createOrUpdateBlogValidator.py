from Configs.app import app
from Resources.validators.base.createOrUpdateBlogParser import createOrUpdateBlogParser


def createOrUpdateBlogValidator():
    app.logger.info("start validating create or update blog input ...")
    print("start validating create or update blog input ...")
    parser = createOrUpdateBlogParser()
    args = parser.parse_args(strict=True)
