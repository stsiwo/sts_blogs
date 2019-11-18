from Configs.app import app
from typing import Dict, BinaryIO
from werkzeug.utils import secure_filename
import os
from exceptions.UploadedFileException import UploadedFileException


class FileServiceDep(object):
    """ old and depreciated FileService, use FileService instead """

    _allowedExtension = set(['png', 'jpg', 'jpeg', 'gif'])

    def __init__(self):
        pass

    def saveImageFileToDir(self, files: Dict[str, BinaryIO], fileKeyName: str) -> str:

        imgFile: BinaryIO = self._checkAndExtractImageFile(files, fileKeyName)

        if imgFile and self._allowed_file(imgFile.filename):
            filename: str = secure_filename(imgFile.filename)
            imgDir = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            imgFile.save(imgDir)
            destImagePath = os.path.join('/images', filename)
            return destImagePath
        else:
            raise UploadedFileException

    def updateImageFileToDir(self, files: Dict[str, BinaryIO], fileKeyName: str, originalFileName: str) -> str:

        imgFile: BinaryIO = self._checkAndExtractImageFile(files, fileKeyName)

        if imgFile and self._allowed_file(imgFile.filename):
            filename: str = secure_filename(imgFile.filename)
            os.remove(os.path.join(app.config['UPLOAD_FOLDER'], originalFileName))
            imgDir = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            imgFile.save(imgDir)
            destImagePath = os.path.join('/images', filename)
            return destImagePath
        else:
            raise UploadedFileException

    def _allowed_file(self, filename: str) -> bool:
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self._allowedExtension

    def _checkAndExtractImageFile(self, files: Dict[str, BinaryIO], name: str) -> bytes:
        return files[name] if name in files and files[name].filename != '' else None
