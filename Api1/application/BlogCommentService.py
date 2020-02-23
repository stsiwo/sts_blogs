from typing import Dict, List
from Resources.viewModels.CommentSchema import CommentSchema
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.DataModels.CommentModel import Comment
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.repositories.BlogRepository import BlogRepository
from exceptions.BlogNotFoundException import BlogNotFoundException
from exceptions.CommentNotFoundException import CommentNotFoundException
from Aop.loggingDecorator import loggingDecorator


class BlogCommentService(object):

    _commentSchema: CommentSchema

    _blogRepository: BlogRepository()

    def __init__(self):
        self._commentSchema = CommentSchema()
        self._blogRepository = BlogRepository()

    @loggingDecorator()
    def getAllCommentService(self, blog_id: str) -> List[Dict]:

        blog: Blog = self._blogRepository.get(blog_id)

        if blog is None:
            raise BlogNotFoundException

        # TODO: don't return 404 code when comments deos not exists. return 2xx code with empty array
        # https://app.clickup.com/t/3m59zu
        if len(blog.comments) == 0:
            raise CommentNotFoundException

        serializedComments: List[Dict] = [self._commentSchema.dump(comment) for comment in blog.comments]

        return serializedComments

    @db_transaction()
    @loggingDecorator()
    def createNewCommentService(self, blog_id: str, title: str, content: str) -> Comment:

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
    @loggingDecorator()
    def deleteAllCommentService(self, blog_id: str) -> None:

        blog: Blog = self._blogRepository.get(blog_id)

        if blog is None:
            raise BlogNotFoundException

        # TODO: don't return 404 code when comments deos not exists. return 2xx code
        # https://app.clickup.com/t/3m59zu
        if len(blog.comments) == 0:
            raise CommentNotFoundException

        del blog.comments[:]
