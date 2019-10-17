from flask_restful import Resource
from typing import Dict, List
from flask import jsonify
from application.BlogService import BlogService
from Configs.app import app
import utils


class Blogs(Resource):

    blogService: BlogService

    def __init__(self):
        self.blogService = BlogService()

    # get all blogs
    def get(self):
        app.logger.info("start processing get request at /blogs")
        print("start processing get request at /blogs")

        blogs: List[Dict] = self.blogService.getAllBlogService()

        response = jsonify(blogs)

        # blogs list of dict is empty
        if len(blogs) == 0:
            # NOT FOUND
            response.status_code = 404
        else:
            # OK
            response.status_code = 200

        return response

    # create new blog
    def post(self):
        response = jsonify({})
        response.status_code = 202
        return response

    # replace existing whole blogs or create whole blogs if does not exist
    # payload must be whole blogs (all properties of blog)
    def put(self):
        response = jsonify({})
        response.status_code = 203
        return response

    # patial update exisitng blogs
    # payload must be only properties to be updated (not include unchanged properties)
    def patch(self):
        response = jsonify({})
        response.status_code = 204
        return response

    # delete whole blogs
    def delete(self):
        response = jsonify({})
        response.status_code = 205
        return response
