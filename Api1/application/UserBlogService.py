from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.TagModel import Tag
from Infrastructure.DataModels.BlogImageModel import BlogImage
from typing import Dict, List
from Resources.viewModels.BlogSchema import BlogSchema
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.repositories.BlogRepository import BlogRepository
from Infrastructure.repositories.TagRepository import TagRepository
from exceptions.BlogNotFoundException import BlogNotFoundException
from application.FileService import FileService
from werkzeug import FileStorage
from Aop.loggingDecorator import loggingDecorator


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

    @loggingDecorator()
    def getAllUserBlogService(self, queryString: Dict, userId: str = None) -> List[Dict]:

        # TODO; if user id does not exist, should return 404 code
        # https://app.clickup.com/t/3m574q
        # really? why?
        result: Dict = self._blogRepository.getAll(queryString, userId, onlyPublic=False)

        result['blogs']: List[Dict] = [self._blogSchema.dump(blog) for blog in result['blogs']]

        return result

    @loggingDecorator()
    def getSpecificUserBlogService(self, userId: str = None, blogId: str = None) -> Dict:
        app.logger.info("start userblog user service")

        result: Blog = self._blogRepository.findOnlyOne(id=blogId, userId=userId)

        if result is None:
            raise BlogNotFoundException()
        schema = self._blogSchema.dump(result)

        return schema

    @db_transaction()
    @loggingDecorator()
    def createNewBlogService(self, user_id: str, title: str, subtitle: str, content: str, tags: List[str] = [], mainImage: FileStorage = None, blogImages: List[FileStorage] = [], blogImagePaths: List[str] = []) -> Blog:

        # TODO; if user id does not exist, should return 404 code
        # https://app.clickup.com/t/3m574q

        mainImageUrl = self._fileService.saveImageFileToDir(mainImage, user_id) if mainImage is not None else None

        blogImageModelList: Dict[BlogImage] = []

        for blogImagePath in blogImagePaths:
            blogImageModelList.append(BlogImage(path=blogImagePath))

        for blogImage in blogImages:
            self._fileService.saveImageFileToDir(blogImage, user_id)

        tagModelList: List[Tag] = [self._tagRepository.createIfNotExist(name=tag) for tag in tags]

        newBlog: Blog = Blog(
                            title=title,
                            subtitle=subtitle,
                            content=content,
                            userId=user_id,
                            mainImageUrl=mainImageUrl,
                            tags=tagModelList,
                            blogImages=blogImageModelList
                            )

        self._blogRepository.add(newBlog)

        return newBlog

    @db_transaction()
    def deleteAllBlogService(self, user_id: str) -> None:

        # TODO; if user id does not exist, should return 404 code
        # https://app.clickup.com/t/3m574q

        # delete() returns # of object deleted
        result = self._blogRepository.deleteByUserId(userId=user_id)

        # TODO: should not return error (404) status when blogs are not found. should return 2xx status code
        # https://app.clickup.com/t/3m574g
        if result == 0:
            raise BlogNotFoundException(message='specified user does not have any blog')
