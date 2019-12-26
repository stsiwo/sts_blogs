from Configs.app import app
from Infrastructure.DataModels.BlogModel import Blog
from Infrastructure.DataModels.BlogImageModel import BlogImage
from typing import Dict, List
from Resources.viewModels.BlogSchema import BlogSchema
from Infrastructure.transactionDecorator import db_transaction
from Infrastructure.repositories.BlogRepository import BlogRepository
from Infrastructure.repositories.TagRepository import TagRepository
from Infrastructure.repositories.BlogImageRepository import BlogImageRepository
from exceptions.BlogNotFoundException import BlogNotFoundException
from application.FileService import FileService
from werkzeug import FileStorage


class BlogService(object):

    _blogSchema: BlogSchema

    _blogRepository: BlogRepository

    _tagRepository: TagRepository

    _blogImageRepository: BlogImageRepository

    _fileService: FileService

    def __init__(self):
        self._blogSchema = BlogSchema()
        self._blogRepository = BlogRepository()
        self._tagRepository = BlogRepository()
        self._blogImageRepository = BlogImageRepository()
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
    def updateBlogService(self, blog_id: str, title: str, subtitle: str, content: str, tags: List[str] = None, mainImage: FileStorage = None,  blogImages: List[FileStorage] = [], isDeleteMainImage: bool = False, blogImagePaths: List[str] = []) -> Dict:
        app.logger.info("start update blog service")
        print("start update blog service")

        # need to implement 'optimistic locking' later
        # to avoid any confict concurrency request
        targetBlog: Blog = self._blogRepository.get(blog_id)

        if targetBlog is None:
            raise BlogNotFoundException

        # assign mainImageUrl to existing one in the case for unchange mainImageUrl
        mainImageUrl = targetBlog.mainImageUrl

        # if isDeleteMainImage (user delete main image and make it empty), delete existing image and assign mainImagePath = null
        if isDeleteMainImage:
            app.logger.info("main image is delete in this request")
            print("main image is delete in this request")
            self._fileService.deleteImageFile(targetBlog.userId, targetBlog.mainImageUrl)
            mainImageUrl = None

        # if mainImage exist (user replace existing image with new one), delete existing image and save new one and assign new mainImageUrl
        if mainImage is not None:
            app.logger.info("include mainImage in this request")
            print("include mainImage in this request")
            if targetBlog.mainImageUrl is not None:  # if existing imageurl exist, if not skip deleting image
                self._fileService.deleteImageFile(targetBlog.userId, targetBlog.mainImageUrl)
            mainImageUrl = self._fileService.saveImageFileToDir(mainImage, targetBlog.userId)

        # detect old image to be deleted
        detectedPaths: List[str] = self._detectBlogImagePathsDifference(targetBlog.blogImages, blogImagePaths)

        # delete old images
        for oldPath in detectedPaths:
            self._fileService.deleteImageFile(targetBlog.userId, oldPath)

        # create newly added images
        for blogImage in blogImages:
            self._fileService.saveImageFileToDir(blogImage, targetBlog.userId)

        # create BlogImage model if not exist
        blogImageModelList: List[BlogImage] = [BlogImage(path=path) for path in blogImagePaths]

        # create tags model if not exist
        tagModelList: List[BlogImage] = [self._tagRepository.createIfNotExist(name=name) for name in tags]

        targetBlog.title = title
        targetBlog.subtitle = subtitle
        targetBlog.content = content
        targetBlog.mainImageUrl = mainImageUrl
        targetBlog.blogImages = blogImageModelList
        targetBlog.tags = tagModelList

        targetBlog = self._blogSchema.dump(targetBlog)

        print(targetBlog)

        return targetBlog

    def _detectBlogImagePathsDifference(self, oldBlogImages: List[BlogImage], newBlogImagePaths: List[str]) -> List[str]:
        return [oldBlogImage.path for oldBlogImage in oldBlogImages if oldBlogImage.path not in newBlogImagePaths]
