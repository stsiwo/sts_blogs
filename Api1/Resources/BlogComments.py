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


class BlogComments(Resource):

    _blogCommentService: BlogCommentService

    _commentSchema: CommentSchema

    def __init__(self):
        self._blogCommentService = BlogCommentService()
        self._commentSchema = CommentSchema()

    # get all blogs
    def get(self, blog_id: str):
        app.logger.info("start processing get request at /blogs/{id}/comments")
        print("start processing get request at /blogs/{id}/comments")

        comments: List[Dict] = self._blogCommentService.getAllCommentService(blog_id)

        response = jsonify(comments)

        # blogs list of dict is empty
        if len(comments) == 0:
            # NOT FOUND
            response.status_code = 404
        else:
            # OK
            response.status_code = 200

        return response

    # create new blog
    @validate_request_with(blogCommentValidator)
    def post(self, blog_id: str):
        app.logger.info("start processing post request at /blogs/{id}/comments")
        print("start processing post request at /blogs/{id}/comments")

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
    @jwt_required
    @requires_jwt_role_claim({'admin'})
    def delete(self, blog_id: str):
        app.logger.info("start processing delete request at /blogs/{id}/comments")
        print("start processing delete request at /blogs/{id}/comments")

        isSuccessOrNotFound: bool = self._blogCommentService.deleteAllCommentService(blog_id)

        response = jsonify({})
        if isSuccessOrNotFound:
            response.status_code = 204
        else:
            response.status_code = 404

        return response
