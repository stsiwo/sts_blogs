from Configs.app import app
from Configs.extensions import db
from typing import Dict, List
from Resources.viewModels.CommentSchema import CommentSchema
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.DataModels.CommentModel import Comment
import utils


class BlogCommentService(object):

    _commentSchema: CommentSchema

    def __init__(self):
        self._commentSchema = CommentSchema()

    def getAllCommentService(self, blog_id: str) -> List[Dict]:
        app.logger.info("start getAllCommentCommentService service")
        print("start getAllCommentCommentService service")

        comments: List[Comment] = db.session.query(Comment).filter_by(blogId=blog_id).all()

        serializedComments: List[Dict] = [self._commentSchema.dump(comment) for comment in comments]

        return serializedComments

    @db_transaction()
    def createNewCommentService(self, blog_id: str, title: str, content: str) -> Comment:
        app.logger.info("start createNewCommentService service")
        print("start createNewCommentService service")

        newComment: Comment = Comment(
                            title=title,
                            content=content,
                            blogId=blog_id
                            )

        db.session.add(newComment)

        return newComment

    @db_transaction()
    def deleteAllCommentService(self, blog_id: str) -> bool:
        app.logger.info("start deleteAllCommentService service")
        print("start deleteAllCommentService service")

        # delete() returns # of object deleted
        result = db.session.query(Comment).filter_by(blogId=blog_id).delete()

        isSuccessOrNotFound: bool = result > 0

        return isSuccessOrNotFound
