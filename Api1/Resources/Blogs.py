from flask_restful import Resource
from typing import Dict, List
from flask import jsonify, request
from application.BlogService import BlogService
from Configs.app import app
from Resources.validators.createOrUpdateBlogValidator import createOrUpdateBlogValidator
from Resources.validators.publishBlogValidator import publishBlogValidator
from Resources.validators.validatorDecorator import validate_request_with
from Infrastructure.DataModels.BlogModel import Blog
from Resources.viewModels.BlogSchema import BlogSchema
from Resources.roleAccessDecorator import requires_jwt_role_claim
from flask_jwt_extended import jwt_required
from utils.util import printObject
from Resources.parsers.QueryStringParser import QueryStringParser
import ast


class Blogs(Resource):

    _blogService: BlogService

    _blogSchema: BlogSchema

    _parser: QueryStringParser

    def __init__(self):
        self._blogService = BlogService()
        self._blogSchema = BlogSchema()
        self._parser = QueryStringParser()

    # get all blogs
    def get(self, blog_id: str = None):
        if blog_id is None:
            app.logger.info("start processing get request at /blogs")
            print("start processing get request at /blogs")

            queryString: Dict = self._parser.parse(request.args)
            # { items: List[blogSchema], totalCount: number }
            result: Dict = self._blogService.getAllBlogService(queryString)

            response = jsonify(result)
            response.status_code = 200
            return response
        else:
            app.logger.info("start processing get request at /blogs/{}".format(blog_id))
            print("start processing get request at /blogs/{}".format(blog_id))

            result: Dict = self._blogService.getBlogService(blog_id=blog_id)

            response = jsonify({'blog': result})
            response.status_code = 200
            return response

    # replace existing whole blogs or create whole blogs if does not exist
    # payload must be whole blogs (all properties of blog)
    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @validate_request_with(createOrUpdateBlogValidator)
    def put(self, blog_id: str):
        app.logger.info("start processing put request at /blogs")
        print("start processing put request at /blogs")

        tags = ast.literal_eval(request.form.get('tags')) if request.form.get('tags') is not None else []
        blogImagePaths = ast.literal_eval(request.form.get('blogImagePaths')) if request.form.get('blogImagePaths') is not None else []

        updatedBlog: Blog = self._blogService.createOrUpdateBlogService(
                blog_id,
                request.form.get('userId'),
                request.form.get('title'),
                request.form.get('subtitle'),
                request.form.get('content'),
                tags=tags,
                blogImagePaths=blogImagePaths,
                mainImage=request.files.get('mainImage', None),
                blogImages=request.files.getlist('blogImages[]'),
                isDeleteMainImage=request.form.get('isDeleteMainImage', False)
                )

        # successfully updated and return its serialized and updated blog
        # ==============================================================
        # NOTE: don't specify body when using 204 (NO CONTENT). even if you set response body
        # HTTP ignore the response body and client only receives no body
        # =============================================================
        response = jsonify({'blog': updatedBlog})
        response.status_code = 200
        return response

    # patial update exisitng blogs
    # payload must be only properties to be updated (not include unchanged properties)
    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @validate_request_with(publishBlogValidator)
    def patch(self, blog_id: str):
        app.logger.info("start processing patch request at /blogs")
        print("start processing patch request at /blogs")

        newPublic = self._blogService.togglePublishBlogService(blog_id, request.json.get('public'))

        response = jsonify({'public': newPublic})
        response.status_code = 200
        return response

    # TODO: implement this
    # https://app.clickup.com/t/3m5a5b

    # delete whole blogs
    # def delete(self):
    #     response = jsonify({})
    #     response.status_code = 205
    #     return response
