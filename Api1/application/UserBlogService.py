from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from typing import Dict, List
from Resources.viewModels.BlogSchema import BlogSchema
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.repositories.BlogRepository import BlogRepository
from exceptions.BlogNotFoundException import BlogNotFoundException


class UserBlogService(object):

    _blogSchema: BlogSchema

    _blogRepository: BlogRepository

    def __init__(self):
        self._blogSchema = BlogSchema()
        self._blogRepository = BlogRepository()

    def getAllUserBlogService(self, user_id: str) -> List[Dict]:
        app.logger.info("start userblog user service")
        print("start userblog user service")

        blogs: List[Blog] = self._blogRepository.find(userId=user_id)

        if len(blogs) == 0:
            raise BlogNotFoundException(message='specified user does not have any blog')

        serializedBlogs: List[Dict] = [self._blogSchema.dump(blog) for blog in blogs]

        return serializedBlogs

    @db_transaction()
    def createNewBlogService(self, user_id: str, title: str, content: str) -> Blog:
        app.logger.info("start userblog user service")
        print("start userblog user service")

        newBlog: Blog = Blog(
                            title=title,
                            content=content,
                            userId=user_id
                            )

        self._blogRepository.add(newBlog)

        return newBlog

    @db_transaction()
    def deleteAllBlogService(self, user_id: str) -> None:
        app.logger.info("start delete all user blog service")
        print("start delete all user blog service")

        # delete() returns # of object deleted
        result = self._blogRepository.deleteByUserId(userId=user_id)

        if result == 0:
            raise BlogNotFoundException(message='specified user does not have any blog')
