from flask_restful import reqparse
import werkzeug


def userBlogParser():
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('title', type=str, required=True, help='title is required', location='form')
    parser.add_argument('subtitle', type=str, required=True, help='subtitle is required', location='form')
    parser.add_argument('content', type=str, required=True, help='content is required', location='form')
    parser.add_argument('tags', type=str, required=False, help='tags is optional', location='form')
    parser.add_argument('mainImage', type=werkzeug.datastructures.FileStorage, required=False, help='mainImage is optional', location='files')
    parser.add_argument('blogImages[]', type=werkzeug.datastructures.FileStorage, required=False, help='mainImage is optional', location='files')
    parser.add_argument('blogImagePaths', type=str, required=False, help='blogImageUrls is optional', location='form')

    return parser
