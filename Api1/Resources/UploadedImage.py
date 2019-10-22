from flask_restful import Resource
from flask import send_from_directory
from Configs.app import app
from Resources.roleAccessDecorator import requires_jwt_role_claim
from flask_jwt_extended import jwt_required
import os


class UploadedImage(Resource):

    def __init__(self):
        pass

    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    def get(self, file_name: str):
        app.logger.info("start uploaded image get request at /images/")
        print("start uploaded image get request at /images/")
        return send_from_directory(os.path.join(os.path.abspath('.'), app.config['UPLOAD_FOLDER']), file_name)
