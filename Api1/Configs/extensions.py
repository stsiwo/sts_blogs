from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_marshmallow import Marshmallow

db: SQLAlchemy = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()
jwt = JWTManager()
api = Api()
