from flask_restful import Resource
from flask import request, jsonify
from Configs.app import app
from Infrastructure.DataModels.CommentModel import Comment
from application.BlogCommentService import BlogCommentService
from typing import Dict, List
from Resources.viewModels.CommentSchema import CommentSchema
from Resources.validators.blogCommentValidator import blogCommentValidator
from Resources.validators.validatorDecorator import validate_request_with
from flask_jwt_extended import jwt_required
from Resources.roleAccessDecorator import requires_jwt_role_claim
from Aop.loggingDecorator import loggingDecorator


class BlogComments(Resource):

    _blogCommentService: BlogCommentService

    _commentSchema: CommentSchema

    def __init__(self):
        self._blogCommentService = BlogCommentService()
        self._commentSchema = CommentSchema()

    # get all blogs
    @loggingDecorator()
    def get(self, blog_id: str):

        comments: List[Dict] = self._blogCommentService.getAllCommentService(blog_id)

        response = jsonify(comments)
        # OK
        response.status_code = 200

        return response

    # create new blog
    @validate_request_with(blogCommentValidator)
    @loggingDecorator()
    def post(self, blog_id: str):

        newComment: Comment = self._blogCommentService.createNewCommentService(
                blog_id,
                request.json.get('title'),
                request.json.get('content')
                )

        commentSchema = self._commentSchema.dump(newComment)

        response = jsonify(commentSchema)
        response.status_code = 201
        # after db.session.commit(), newBlog.id is automcatically assigned my SQLAlchemy
        response.headers['location'] = '/comments/' + str(newComment.id)
        return response

    # replace existing whole blogs or create whole blogs if does not exist
    # payload must be whole blogs (all properties of blog)
    # def put(self):
    #     response = jsonify({})
    #     response.status_code = 204
    #     return response

    # patial update exisitng blogs
    # payload must be only properties to be updated (not include unchanged properties)
    # def patch(self):
    #     response = jsonify({})
    #     response.status_code = 204
    #     return response

    # delete whole blogs
    # allow only admin to delete for now but it might change in future
    @jwt_required
    @requires_jwt_role_claim({'admin'})
    @loggingDecorator()
    def delete(self, blog_id: str):

        self._blogCommentService.deleteAllCommentService(blog_id)

        response = jsonify({})
        response.status_code = 204
        return response
