from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_restful import Api


db: SQLAlchemy = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
api = Api()
