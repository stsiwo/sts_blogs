from Configs.extensions import api
from Resources.Token import (
        TokenRefresh,
        TokenRemove
        )
from Resources.Users import Users
from Resources.Signup import Signup
from Resources.Login import Login
from Resources.Blogs import Blogs
from Resources.UserBlogs import UserBlogs
from Resources.Test import Test
from Resources.UploadImage import UploadImage
from Resources.UploadedImage import UploadedImage


api.add_resource(TokenRefresh, '/token/refresh')
api.add_resource(TokenRemove, '/token/remove')
api.add_resource(Users, '/users/<string:user_id>')
api.add_resource(UserBlogs, '/users/<string:user_id>/blogs')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Blogs, '/blogs/<string:blog_id>')
api.add_resource(UploadImage, '/uploads', '/uploads/<string:file_name>')
api.add_resource(UploadedImage, '/images/<string:file_name>')
api.add_resource(Test, '/test')
