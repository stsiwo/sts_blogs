from flask_restful import reqparse
from Configs.app import app
from Resources.validators.base.userBlogParser import userBlogParser


def userNewBlogValidator():
    app.logger.info("start validating blog input ...")
    print("start validating blog input ...")

    parser = userBlogParser()
    parser.add_argument('createdDate', type=str, required=True, help='createdDate is required', location='form')
    args = parser.parse_args(strict=True)
