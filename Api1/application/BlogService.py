from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from Configs.extensions import db
from typing import Dict, List
from Resources.viewModels.BlogSchema import BlogSchema
from Infrastructure.transactionDecorator import db_transaction


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

    @db_transaction()
    def updateBlogService(self, blog_id: str, title: str, content: str) -> Blog:
        app.logger.info("start update blog service")
        print("start update blog service")

        # need to implement 'optimistic locking' later
        # to avoid any confict concurrency request
        targetBlog = db.session.query(Blog).get(blog_id)

        if targetBlog is not None:
            targetBlog.title = title
            targetBlog.content = content

        return targetBlog
