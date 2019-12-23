from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.TagModel import Tag
from typing import Dict, List, BinaryIO
from Resources.viewModels.BlogSchema import BlogSchema
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.repositories.BlogRepository import BlogRepository
from Infrastructure.repositories.TagRepository import TagRepository
from exceptions.BlogNotFoundException import BlogNotFoundException
from application.FileService import FileService
from utils.util import printObject
from werkzeug import FileStorage


class UserBlogService(object):

    _blogSchema: BlogSchema

    _blogRepository: BlogRepository

    _tagRepository: TagRepository

    _fileService: FileService

    def __init__(self):
        self._blogSchema = BlogSchema()
        self._blogRepository = BlogRepository()
        self._tagRepository = TagRepository()
        self._fileService = FileService()

    def getAllUserBlogService(self, queryString: Dict, userId: str = None) -> List[Dict]:
        app.logger.info("start userblog user service")
        print("start userblog user service")

        # TODO; if user id does not exist, should return 404 code
        # https://app.clickup.com/t/3m574q
        result: Dict = self._blogRepository.getAll(queryString, userId)

        result['blogs']: List[Dict] = [self._blogSchema.dump(blog) for blog in result['blogs']]

        return result

    @db_transaction()
    def createNewBlogService(self, user_id: str, title: str, subtitle: str, content: str, tags: List[str] = None, mainImage: FileStorage = None, blogImages: List[FileStorage] = None) -> Blog:
        app.logger.info("start userblog user service")
        print("start userblog user service")

        # TODO; if user id does not exist, should return 404 code
        # https://app.clickup.com/t/3m574q

        mainImageUrl = self._fileService.saveImageFileToDir(mainImage, user_id) if mainImage is not None else None

        for blogImage in blogImages:
            self._fileService.saveImageFileToDir(blogImage, user_id)

        tagModelList: List[Tag] = [self._tagRepository.createIfNotExist(name=tag) for tag in tags]

        newBlog: Blog = Blog(
                            title=title,
                            subtitle=subtitle,
                            content=content,
                            userId=user_id,
                            mainImageUrl=mainImageUrl,
                            tags=tagModelList
                            )

        self._blogRepository.add(newBlog)

        return newBlog

    @db_transaction()
    def deleteAllBlogService(self, user_id: str) -> None:
        app.logger.info("start delete all user blog service")
        print("start delete all user blog service")

        # TODO; if user id does not exist, should return 404 code
        # https://app.clickup.com/t/3m574q

        # delete() returns # of object deleted
        result = self._blogRepository.deleteByUserId(userId=user_id)

        # TODO: should not return error (404) status when blogs are not found. should return 2xx status code
        # https://app.clickup.com/t/3m574g
        if result == 0:
            raise BlogNotFoundException(message='specified user does not have any blog')
