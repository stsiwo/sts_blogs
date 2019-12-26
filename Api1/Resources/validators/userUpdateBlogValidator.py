from flask_restful import reqparse
from Configs.app import app
from Resources.validators.base.userBlogParser import userBlogParser


def userUpdateBlogValidator():
    app.logger.info("start validating blog input ...")
    print("start validating blog input ...")

    parser = userBlogParser()
    parser.add_argument('updatedDate', type=str, required=True, help='updatedDate is required', location='form')
    parser.add_argument('isDeleteMainImage', type=str, required=False, help='isDeleteMainImage is required', location='form')
    # method spoofing
    parser.add_argument('_method', type=str, required=False, help='isDeleteMainImage is required', location='form')
    args = parser.parse_args(strict=True)
