from Configs.app import app
from typing import Dict, List
from Resources.viewModels.CommentSchema import CommentSchema
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.DataModels.CommentModel import Comment
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.repositories.BlogRepository import BlogRepository
from exceptions.BlogNotFoundException import BlogNotFoundException
from exceptions.CommentNotFoundException import CommentNotFoundException


class BlogCommentService(object):

    _commentSchema: CommentSchema

    _blogRepository: BlogRepository()

    def __init__(self):
        self._commentSchema = CommentSchema()
        self._blogRepository = BlogRepository()

    def getAllCommentService(self, blog_id: str) -> List[Dict]:
        app.logger.info("start getAllCommentCommentService service")
        print("start getAllCommentCommentService service")

        blog: Blog = self._blogRepository.get(blog_id)

        if blog is None:
            raise BlogNotFoundException

        if len(blog.comments) == 0:
            raise CommentNotFoundException

        serializedComments: List[Dict] = [self._commentSchema.dump(comment) for comment in blog.comments]

        return serializedComments

    @db_transaction()
    def createNewCommentService(self, blog_id: str, title: str, content: str) -> Comment:
        app.logger.info("start createNewCommentService service")
        print("start createNewCommentService service")

        blog: Blog = self._blogRepository.get(blog_id)

        if blog is None:
            raise BlogNotFoundException

        newComment: Comment = Comment(
                            title=title,
                            content=content,
                            blogId=blog_id
                            )

        blog.comments.append(newComment)

        self._blogRepository.add(blog)

        return newComment

    @db_transaction()
    def deleteAllCommentService(self, blog_id: str) -> None:
        app.logger.info("start deleteAllCommentService service")
        print("start deleteAllCommentService service")

        blog: Blog = self._blogRepository.get(blog_id)

        if blog is None:
            raise BlogNotFoundException

        if len(blog.comments) == 0:
            raise CommentNotFoundException

        del blog.comments[:]
