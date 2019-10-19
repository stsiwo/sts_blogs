from flask_restful import reqparse


def userBlogValidator():
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('title', type=str, required=True, help='title is required')
    parser.add_argument('content', type=str, required=True, help='content is required')
    args = parser.parse_args(strict=True)
