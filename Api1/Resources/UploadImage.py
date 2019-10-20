from flask_restful import Resource
from typing import Dict, List
from Resources.validators.userImageValidator import userImageValidator
from flask import jsonify, request
from application.FileService import FileService
from Configs.app import app
from Resources.validators.validatorDecorator import validate_request_with
from Resources.roleAccessDecorator import requires_jwt_role_claim
from flask_jwt_extended import jwt_required
import utils
import os


class UploadImage(Resource):

    _fileService: FileService

    def __init__(self):
        self._fileService = FileService()

    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @validate_request_with(userImageValidator)
    def post(self):
        app.logger.info("start processing post request at /uploadimage")
        print("start processing post request at /uploadimage")

        try:
            uploadedFilePath: str = self._fileService.saveImageFileToDir(
                    files=request.files,
                    fileKeyName='avatorFile'
                    )

            response = jsonify({'imageUrl': uploadedFilePath})
            response.status_code = 200
            return response

        except Exception as e:
            response = jsonify({'msg': str(e)})
            response.status_code = 400
            return response

    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @validate_request_with(userImageValidator)
    def put(self, file_name: str):
        app.logger.info("start processing put request at /uploadimage")
        print("start processing put request at /uploadimage")

        try:
            updatedFilePath: str = self._fileService.updateImageFileToDir(
                    files=request.files,
                    fileKeyName='avatorFile',
                    originalFileName=file_name
                    )

            response = jsonify({'imageUrl': updatedFilePath})
            response.status_code = 200
            return response

        except Exception as e:
            response = jsonify({'msg': str(e)})
            response.status_code = 400
            return response
