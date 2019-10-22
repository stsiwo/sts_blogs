from Configs.app import app
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import db
from typing import Dict, List, BinaryIO
from Resources.viewModels.UserSchema import UserSchema
from Infrastructure.transactionDecorator import db_transaction
from application.FileService import FileService
import utils


class UserService(object):

    _blogSchema: UserSchema

    _fileService: FileService

    def __init__(self):
        self._userSchema = UserSchema()
        self._fileService = FileService()

    @db_transaction()
    def updateUserService(self, userId: str, input: Dict, files: Dict[str, BinaryIO] = None) -> User:
        app.logger.info("start update user service")
        print("start update user service")

        # need to implement 'optimistic locking' later
        # to avoid any confict concurrency request
        targetUser = db.session.query(User).get(userId)

        imgFile = self._fileService.checkAndExtractImageFile(files, 'avatarFile')

        if imgFile is not None:
            app.logger.info("image file is uploaded and start processing the image")
            print("image file is uploaded and start processing the image")
            imgFilePath = self._fileService.saveImageFileToDir(imgFile)
            targetUser.avatarUrl = imgFilePath

        if targetUser is not None:
            targetUser.name = input.get('name')
            targetUser.email = input.get('email')
            targetUser.password = input.get('password')

        targetUser = self._userSchema.dump(targetUser)

        print("target user (view model)")
        utils.printObject(targetUser)

        return targetUser

#     def getAllUserService(self, user_id: str) -> List[Dict]:
#         app.logger.info("start user user service")
#         print("start user user service")
# 
#         users: List[User] = db.session.query(User).filter_by(userId=user_id).all()
# 
#         serializedUsers: List[Dict] = [self._userSchema.dump(user) for user in users]
# 
#         return serializedUsers

#     @db_transaction()
#     def createNewUserService(self, user_id: str, title: str, content: str) -> User:
#         app.logger.info("start user user service")
#         print("start user user service")
# 
#         newUser: User = User(
#                             title=title,
#                             content=content,
#                             userId=user_id
#                             )
# 
#         db.session.add(newUser)
# 
#         return newUser
# 
#     @db_transaction()
#     def deleteAllUserService(self, user_id: str) -> bool:
#         app.logger.info("start delete all user user service")
#         print("start delete all user user service")
# 
#         # delete() returns # of object deleted
#         result = db.session.query(User).filter_by(userId=user_id).delete()
# 
#         isSuccessOrNotFound: bool = result > 0
# 
#         return isSuccessOrNotFound
# 
