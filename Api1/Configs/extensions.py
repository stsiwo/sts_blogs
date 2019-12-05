from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow

bcrypt = Bcrypt()
db: SQLAlchemy = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate(compare_type=True)
jwt = JWTManager()
api = Api()
