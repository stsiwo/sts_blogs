from flask_restful import Resource
from Resources.validators.userImageValidator import userImageValidator
from flask import jsonify, request
from Resources.validators.validatorDecorator import validate_request_with
from Resources.roleAccessDecorator import requires_jwt_role_claim
from flask_jwt_extended import jwt_required
import os
from application.UploadImageService import UploadImageService
from flask_jwt_extended import get_jwt_identity
from Aop.loggingDecorator import loggingDecorator


class UploadImage(Resource):
    """ depreciate: switch multipart/form with resource (user, blog) """

    _uploadImageService: UploadImageService

    def __init__(self):
        self._uploadImageService = UploadImageService()

    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @validate_request_with(userImageValidator)
    @loggingDecorator()
    def post(self):

        uploadedFilePath: str = self._uploadImageService.saveUploadImageService(
                files=request.files,
                fileKeyName='avatarFile',
                userId=get_jwt_identity()['id']
                )

        response = jsonify({'imageUrl': uploadedFilePath})
        response.status_code = 200
        return response

    @jwt_required
    @requires_jwt_role_claim({'admin', 'member'})
    @validate_request_with(userImageValidator)
    @loggingDecorator()
    def put(self, file_name: str):

        updatedFilePath: str = self._uploadImageService.updateUploadImageService(
                files=request.files,
                fileKeyName='avatarFile',
                originalFileName=file_name,
                userId=get_jwt_identity()['id']
                )

        response = jsonify({'imageUrl': os.path.join(request.host_url, updatedFilePath)})
        response.status_code = 200
        return response
