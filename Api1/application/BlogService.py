from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from typing import Dict, List
from Resources.viewModels.BlogSchema import BlogSchema
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.repositories.BlogRepository import BlogRepository
from exceptions.BlogNotFoundException import BlogNotFoundException
from application.FileService import FileService
from werkzeug import FileStorage


class BlogService(object):

    _blogSchema: BlogSchema

    _blogRepository: BlogRepository

    _fileService: FileService

    def __init__(self):
        self._blogSchema = BlogSchema()
        self._blogRepository = BlogRepository()
        self._fileService = FileService()

    def getAllBlogService(self, queryString: Dict) -> Dict:
        """ for /blogs?query=string endpoint """
        app.logger.info("start getAllBlogService service")
        print("start getAllBlogService service")

        result: Dict = self._blogRepository.getAll(queryString)

        # transform data model to view model of blog
        if len(result['blogs']) != 0:
            result['blogs']: List[Dict] = [self._blogSchema.dump(blog) for blog in result['blogs']]
        else:
            result['blogs']: List[Dict] = []

        return result

    def getBlogService(self, blog_id: str = None):
        """ for /blogs/{blog_id} """
        app.logger.info("start getBlogService service")
        print("start getBlogService service")

        blog: Blog = self._blogRepository.get(id=blog_id)

        # transform data model to view model of blog
        if blog is not None:
            blogViewModel: Dict = self._blogSchema.dump(blog)
        else:
            raise BlogNotFoundException

        return blogViewModel

    @db_transaction()
    def updateBlogService(self, blog_id: str, title: str, subtitle: str, content: str, mainImageFile: FileStorage = None) -> Dict:
        app.logger.info("start update blog service")
        print("start update blog service")

        # need to implement 'optimistic locking' later
        # to avoid any confict concurrency request
        targetBlog: Blog = self._blogRepository.get(blog_id)

        if targetBlog is None:
            raise BlogNotFoundException

        targetBlog.title = title
        targetBlog.subtitle = subtitle
        targetBlog.content = content
        targetBlog.mainImageUrl = self._fileService.updateImageFileToDir(mainImageFile, targetBlog.userId, targetBlog.mainImageUrl) if mainImageFile is not None else targetBlog.mainImageUrl

        targetBlog = self._blogSchema.dump(targetBlog)

        return targetBlog
