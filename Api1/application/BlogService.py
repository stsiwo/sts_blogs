from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from Configs.extensions import db
from typing import Dict, List
from Resources.viewModels.BlogSchema import BlogSchema


class BlogService(object):

    _blogSchema: BlogSchema

    def __init__(self):
        self._blogSchema = BlogSchema()

    def getAllBlogService(self) -> List[Dict]:
        app.logger.info("start blog user service")
        print("start blog user service")

        blogs: List[Blog] = db.session.query(Blog).all()

        serializedBlogs: List[Dict] = [self._blogSchema.dump(blog) for blog in blogs]

        return serializedBlogs
