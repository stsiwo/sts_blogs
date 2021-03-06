from flask_restful import Resource
from flask import request, jsonify
from Configs.app import app
from application.UserBlogService import UserBlogService
from typing import Dict, List
from Resources.roleAccessDecorator import requires_jwt_role_claim
from flask_jwt_extended import jwt_required
from Resources.validators.validatorDecorator import validate_request_with
from Resources.validators.userNewBlogValidator import userNewBlogValidator
from Infrastructure.DataModels.BlogModel import Blog
from Resources.viewModels.BlogSchema import BlogSchema
from Resources.parsers.QueryStringParser import QueryStringParser
import ast
from Aop.loggingDecorator import loggingDecorator


class UserBlogs(Resource):

    _userBlogService: UserBlogService

    _blogSchema: BlogSchema

    def __init__(self):
        self._userBlogService = UserBlogService()
        self._blogSchema = BlogSchema()
        self._parser = QueryStringParser()

    # get all non-public or public blogs / specific blog
    # IMPORTANT NOTE ==================================
    # requires_jwt_role_claim must be after jwt_required
    # otherwise, you cannot access claim of jwt
    # ================================================
    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @loggingDecorator()
    def get(self, user_id: str, blog_id: str = None):
        if blog_id is None:
            app.logger.info("start processing get request at /users/{user_id}/blogs")

            queryString: Dict = self._parser.parse(request.args)

            result: List[Dict] = self._userBlogService.getAllUserBlogService(queryString, userId=user_id)

            response = jsonify(result)
            response.status_code = 200
            return response
        else:
            app.logger.info("start processing get request at /users/{user_id}/blogs/{blog_id}")

            queryString: Dict = self._parser.parse(request.args)

            result: List[Dict] = self._userBlogService.getSpecificUserBlogService(userId=user_id, blogId=blog_id)

            response = jsonify({'blog': result})
            response.status_code = 200
            return response

    # create new blog (depreciated for auto-save feature) use /blogs/{id} endpoint for create/update
    # @jwt_required
    # @requires_jwt_role_claim({'admin', 'member'})
    # @validate_request_with(userNewBlogValidator)
    # @loggingDecorator()
    # def post(self, user_id: str):

    #    tags = ast.literal_eval(request.form.get('tags')) if request.form.get('tags') is not None else []
    #    blogImagePaths = ast.literal_eval(request.form.get('blogImagePaths')) if request.form.get('blogImagePaths') is not None else []

    #    newBlog: Blog = self._userBlogService.createNewBlogService(
    #            user_id=user_id,
    #            title=request.form.get('title'),
    #            subtitle=request.form.get('subtitle'),
    #            content=request.form.get('content'),
    #            tags=tags,
    #            blogImagePaths=blogImagePaths,
    #            mainImage=request.files.get('mainImage', None),
    #            blogImages=request.files.getlist('blogImages[]')
    #            )

    #    blogSchema = self._blogSchema.dump(newBlog)

    #    response = jsonify({'blog': blogSchema})
    #    response.status_code = 201
    #    # after db.session.commit(), newBlog.id is automcatically assigned my SQLAlchemy
    #    response.headers['location'] = '/blogs/' + str(newBlog.id)
    #    return response

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
    @requires_jwt_role_claim({'admin', 'member'})
    @loggingDecorator()
    def delete(self, user_id: str):

        self._userBlogService.deleteAllBlogService(user_id)

        response = jsonify({})
        response.status_code = 204
        return response
