from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from flask import abort
from typing import Dict, List
from Resources.viewModels.BlogSchema import BlogSchema
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.repositories.BlogRepository import BlogRepository
from utils.util import printObject
from exceptions.BlogNotFoundException import BlogNotFoundException


class BlogService(object):

    _blogSchema: BlogSchema

    _blogRepository: BlogRepository

    def __init__(self):
        self._blogSchema = BlogSchema()
        self._blogRepository = BlogRepository()

    def getAllBlogService(self) -> List[Dict]:
        app.logger.info("start blog user service")
        print("start blog user service")

        blogs: List[Blog] = self._blogRepository.getAll()

        if len(blogs) == 0:
            raise BlogNotFoundException

        serializedBlogs: List[Dict] = [self._blogSchema.dump(blog) for blog in blogs]

        return serializedBlogs

    @db_transaction()
    def updateBlogService(self, blog_id: str, title: str, content: str) -> Blog:
        app.logger.info("start update blog service")
        print("start update blog service")

        # need to implement 'optimistic locking' later
        # to avoid any confict concurrency request
        targetBlog = self._blogRepository.get(blog_id)

        if targetBlog is None:
            raise BlogNotFoundException

        targetBlog.title = title
        targetBlog.content = content

        targetBlog = self._blogSchema.dump(targetBlog)

        return targetBlog
