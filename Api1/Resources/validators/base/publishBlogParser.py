from flask_restful import reqparse
from Resources.validators.base.arguments.user.userIdArg import addUserIdArg
from Resources.validators.base.arguments.blog.blogIdArg import addBlogIdArg
from Resources.validators.base.arguments.blog.blogPublicArg import addBlogPublicArg
from Resources.validators.base.arguments.blog.blogTitleArg import addBlogTitleArg
from Resources.validators.base.arguments.blog.blogSubtitleArg import addBlogSubtitleArg


def publishBlogParser():
    parser = reqparse.RequestParser(bundle_errors=True)
    addUserIdArg(parser)
    addBlogIdArg(parser)
    addBlogPublicArg(parser)
    addBlogTitleArg(parser)
    addBlogSubtitleArg(parser)
    return parser
