from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from Configs.extensions import db
from typing import Dict, List
from Resources.viewModels.BlogSchema import BlogSchema
from Infrastructure.transactionDecorator import db_transaction
import utils


class UserBlogService(object):

    _blogSchema: BlogSchema

    def __init__(self):
        self._blogSchema = BlogSchema()

    def getAllUserBlogService(self, user_id: str) -> List[Dict]:
        app.logger.info("start userblog user service")
        print("start userblog user service")

        blogs: List[Blog] = db.session.query(Blog).filter_by(userId=user_id).all()

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

        db.session.add(newBlog)

        return newBlog

    @db_transaction()
    def deleteAllBlogService(self, user_id: str) -> bool:
        app.logger.info("start delete all user blog service")
        print("start delete all user blog service")

        # delete() returns # of object deleted
        result = db.session.query(Blog).filter_by(userId=user_id).delete()

        isSuccessOrNotFound: bool = result > 0

        return isSuccessOrNotFound
