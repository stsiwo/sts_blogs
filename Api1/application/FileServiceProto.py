from Configs.app import app
from typing import Dict, BinaryIO
from werkzeug.utils import secure_filename
import os
from exceptions.UploadedFileException import UploadedFileException
from werkzeug import FileStorage
import pathlib
import ntpath


class FileServiceProto(object):

    _allowedExtension = set(['png', 'jpg', 'jpeg', 'gif'])

    def __init__(self):
        pass

    def saveImageFileToDir(self, file: FileStorage, userId: str) -> str:
        return self._saveOrUpdateImageToDir(file, userId)

    def updateImageFileToDir(self, file: FileStorage, userId: str, originalFileName: str) -> str:
        return self._saveOrUpdateImageToDir(file, userId, originalFileName, True)

    def _allowed_file(self, filename: str) -> bool:
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self._allowedExtension

    def _extractFileName(self, originalFilePath: str) -> str:
        return ntpath.basename(originalFilePath)

    def _saveOrUpdateImageToDir(self, file: FileStorage, userId: str, originalFilePath: str = None, isUpdate: bool = False):

        if file.stream is not None and self._allowed_file(file.filename):
            # check file extension is safe
            filename: str = secure_filename(file.filename)
            # extract file name from path
            originalFileName = self._extractFileName(originalFilePath)
            # remove existing image if isUpdate is True
            if isUpdate:
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], str(userId), originalFileName))
            # set upload directory for the file
            imgDir = os.path.join(app.config['UPLOAD_FOLDER'], str(userId))
            # create the directory if not exists
            pathlib.Path(imgDir).mkdir(parents=True, exist_ok=True)
            # set file
            imgPath = os.path.join(imgDir, filename)
            # save the file in the directory
            file.save(imgPath)
            # get a path for accessing from public
            destImagePath = os.path.join(app.config['PUBLIC_FILE_FOLDER'], str(userId), filename)

            return destImagePath
        else:
            raise UploadedFileException
