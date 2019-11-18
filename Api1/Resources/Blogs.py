from flask_restful import Resource
from typing import Dict, List
from flask import jsonify, request
from application.BlogService import BlogService
from Configs.app import app
from Resources.validators.userBlogValidator import userBlogValidator
from Resources.validators.validatorDecorator import validate_request_with
from Infrastructure.DataModels.BlogModel import Blog
from Resources.viewModels.BlogSchema import BlogSchema
from Resources.roleAccessDecorator import requires_jwt_role_claim
from flask_jwt_extended import jwt_required
from utils.util import printObject
from Resources.parsers.QueryStringParser import QueryStringParser


class Blogs(Resource):

    _blogService: BlogService

    _blogSchema: BlogSchema

    _parser: QueryStringParser

    def __init__(self):
        self._blogService = BlogService()
        self._blogSchema = BlogSchema()
        self._parser = QueryStringParser()

    # get all blogs
    def get(self):
        app.logger.info("start processing get request at /blogs")
        print("start processing get request at /blogs")

        queryString: Dict = self._parser.parse(request.args)
        # { items: List[blogSchema], totalCount: number }
        result: Dict = self._blogService.getAllBlogService(queryString)

        response = jsonify(result)
        response.status_code = 200
        return response

    # replace existing whole blogs or create whole blogs if does not exist
    # payload must be whole blogs (all properties of blog)
    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @validate_request_with(userBlogValidator)
    def put(self, blog_id: str):
        app.logger.info("start processing post request at /blogs")
        print("start processing post request at /blogs")

        updatedBlog: Blog = self._blogService.updateBlogService(
                blog_id,
                request.form.get('title'),
                request.form.get('subtitle'),
                request.form.get('content'),
                request.files.get('mainImageFile', None)
                )

        # successfully updated and return its serialized and updated blog
        # ==============================================================
        # NOTE: don't specify body when using 204 (NO CONTENT). even if you set response body
        # HTTP ignore the response body and client only receives no body
        # =============================================================
        response = jsonify(updatedBlog)
        response.status_code = 200
        return response

    # patial update exisitng blogs
    # payload must be only properties to be updated (not include unchanged properties)
    # def patch(self):
    #     response = jsonify({})
    #     response.status_code = 204
    #     return response

    # delete whole blogs
    # def delete(self):
    #     response = jsonify({})
    #     response.status_code = 205
    #     return response
