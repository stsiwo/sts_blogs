from Configs.app import app
from typing import Dict, BinaryIO
from werkzeug.utils import secure_filename
import os
from exceptions.UploadedFileException import UploadedFileException
from werkzeug import FileStorage
import pathlib


class FileServiceProto(object):

    _allowedExtension = set(['png', 'jpg', 'jpeg', 'gif'])

    def __init__(self):
        pass

    def saveImageFileToDir(self, file: FileStorage, userId: str) -> str:

        if file.stream is not None and self._allowed_file(file.filename):
            # check file extension is safe
            filename: str = secure_filename(file.filename)
            # set upload directory for the file
            imgDir = os.path.join(app.config['UPLOAD_FOLDER'], userId)
            # create the directory if not exists
            pathlib.Path(imgDir).mkdir(parents=True, exist_ok=True)
            # set file
            imgPath = os.path.join(imgDir, filename)
            # save the file in the directory
            file.save(imgPath)
            # get a path for accessing from public
            destImagePath = os.path.join(app.config['PUBLIC_FILE_FOLDER'], userId, filename)

            return destImagePath
        else:
            raise UploadedFileException

    def updateImageFileToDir(self, file: FileStorage, userId: str, originalFileName: str) -> str:

        if file.stream is not None and self._allowed_file(file.filename):
            filename: str = secure_filename(file.filename)
            os.remove(os.path.join(app.config['UPLOAD_FOLDER'], userId, originalFileName))
            imgDir = os.path.join(app.config['UPLOAD_FOLDER'], userId, filename)
            file.save(imgDir)
            destImagePath = os.path.join(app.config['PUBLIC_FILE_FOLDER'], userId, filename)
            return destImagePath
        else:
            raise UploadedFileException

    def _allowed_file(self, filename: str) -> bool:
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self._allowedExtension
