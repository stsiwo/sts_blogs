from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from Configs.extensions import db
from typing import Dict, List


class BlogService(object):

    def __init__(self):
        pass

    def getAllBlogService(self) -> List[Dict]:
        app.logger.info("start blog user service")
        print("start blog user service")

        blogs: List[Blog] = db.session.query(Blog).all()

        blogsDict: List[Dict] = [blog.as_dict() for blog in blogs]

        return blogsDict
