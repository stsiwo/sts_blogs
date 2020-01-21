from flask_restful import reqparse
from Resources.validators.base.arguments.user.userIdArg import addUserIdArg
import werkzeug


def createOrUpdateBlogParser():
    parser = reqparse.RequestParser(bundle_errors=True)
    addUserIdArg(parser)
    parser.add_argument('title', type=str, required=False, help='title is required', location='form')
    parser.add_argument('subtitle', type=str, required=False, help='subtitle is required', location='form')
    parser.add_argument('content', type=str, required=False, help='content is required', location='form')
    parser.add_argument('tags', type=str, required=False, help='tags is optional', location='form')
    parser.add_argument('mainImage', type=werkzeug.datastructures.FileStorage, required=False, help='mainImage is optional', location='files')
    parser.add_argument('blogImages[]', type=werkzeug.datastructures.FileStorage, required=False, help='mainImage is optional', location='files')
    parser.add_argument('blogImagePaths', type=str, required=False, help='blogImageUrls is optional', location='form')
    parser.add_argument('updatedDate', type=str, required=False, help='updatedDate is required', location='form')
    parser.add_argument('createdDate', type=str, required=False, help='createdDate is required', location='form')
    parser.add_argument('isDeleteMainImage', type=str, required=False, help='isDeleteMainImage is required', location='form')
    return parser
