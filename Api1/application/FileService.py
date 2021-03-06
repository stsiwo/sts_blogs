from Configs.app import app
from werkzeug.utils import secure_filename
import os
from exceptions.UploadedFileException import UploadedFileException
from werkzeug import FileStorage
import pathlib
import ntpath
from Aop.loggingDecorator import loggingDecorator


class FileService(object):

    _allowedExtension = set(['png', 'jpg', 'jpeg', 'gif'])

    def __init__(self):
        pass

    @loggingDecorator()
    def saveImageFileToDir(self, file: FileStorage, userId: str) -> str:
        return self._saveOrUpdateImageToDir(file, userId)

    @loggingDecorator()
    def deleteImageFile(self, userId: str, originalFilePath: str = None) -> bool:
        # extract file name from path
        # add this condition because selenium testing sometimes cause delete image request before add image request completed
        if originalFilePath is not None:
            originalFileName = self._extractFileName(originalFilePath)
            # remove existing image if isUpdate is True
            os.remove(os.path.join(app.config['UPLOAD_FOLDER'], str(userId), originalFileName))

    @loggingDecorator()
    def _allowed_file(self, filename: str) -> bool:
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self._allowedExtension

    @loggingDecorator()
    def _extractFileName(self, originalFilePath: str) -> str:
        return ntpath.basename(originalFilePath)

    @loggingDecorator()
    def _saveOrUpdateImageToDir(self, file: FileStorage, userId: str):

        if file.stream is not None and self._allowed_file(file.filename):
            # check file extension is safe
            filename: str = secure_filename(file.filename)
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
