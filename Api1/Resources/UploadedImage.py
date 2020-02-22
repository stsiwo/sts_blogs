from flask_restful import Resource
from flask import send_from_directory
from Configs.app import app
import os
from Aop.loggingDecorator import loggingDecorator


class UploadedImage(Resource):

    def __init__(self):
        pass

    @loggingDecorator()
    def get(self, user_id: str, file_name: str):
        return send_from_directory(os.path.join(os.path.abspath('.'), app.config['UPLOAD_FOLDER'], str(user_id)), file_name)
