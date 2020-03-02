from dotenv import load_dotenv
import os
from pathlib import Path
from datetime import timedelta


# load env file based on the 'FLASK_ENV'
currentEnv = os.getenv('FLASK_ENV', 'DEVELOPMENT').upper()
env_path = Path('.').parent / '.env.development'

if currentEnv == 'TESTING':
    env_path = Path('.').parent / '.env.testing'
elif currentEnv == 'DEVELOPMENT':
    env_path = Path('.').parent / '.env.development'
elif currentEnv == 'STAGING':
    env_path = Path('.').parent / '.env.staging'
elif currentEnv == 'PRODUCTION':
    env_path = Path('.').parent / '.env.production'

load_dotenv(dotenv_path=env_path)

###
# NOTE: python-env
#   - value of all env file is converted to str (not any other type e.g., bool)
#     so you can't put bool value in env file as value.
#     for now, empty string value is considered as False in python and '1' value (or any string) is considiered as True
#     and use 'bool' function when assinging to config
###

FLASK_APP = './run.py'

WEB_APP_TITLE = "STS"

HOST_NAME = os.getenv('HOST_NAME', '')

DEBUG = bool(os.getenv('DEBUG', True))

APP_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# jwt config
# Configure application to store JWTs in cookies
JWT_TOKEN_LOCATION = ['cookies']

# Only allow JWT cookies to be sent over https. In production, this
# should likely be True
JWT_COOKIE_SECURE = bool(os.getenv('JWT_COOKIE_SECURE', False))

JWT_COOKIE_DOMAIN = os.getenv('JWT_COOKIE_DOMAIN', 'aaa')

JWT_COOKIE_SAMESITE = None

JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 180))
JWT_REFRESH_TOKEN_EXPIRES = int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES', 180))

JWT_SESSION_COOKIE = False

# The request types that will use CSRF protection
JWT_CSRF_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

# Set the cookie paths, so that you are only sending your access token
# cookie to the access endpoints, and only sending your refresh token
# to the refresh endpoint. Technically this is optional, but it is in
# your best interest to not send additional cookies in the request if
# they aren't needed.
JWT_ACCESS_COOKIE_PATH = '/'
JWT_REFRESH_COOKIE_PATH = '/token/refresh'

# Enable csrf double submit protection. See this for a thorough
# explanation: http://www.redotheweb.com/2015/11/09/api-security.html
JWT_COOKIE_CSRF_PROTECT = True

# Set the secret key to sign the JWTs with
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'testing')

# db config
SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:////tmp/api1.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False

# SESSION_COOKIE_SAMESITE = None
SESSION_COOKIE_HTTPONLY = True
# PERMANENT_SESSION_LIFETIME = timedelta(seconds=30)

# image files
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')

PUBLIC_FILE_FOLDER = '/images'

# custome error handling
# PROPAGATE_EXCEPTIONS = True

# original config parameters
UPLOAD_ENDPOINT = '/{}'.format(UPLOAD_FOLDER)

# itsdangrous
SIGNER_SECRET_KEY = os.getenv('SIGNER_SECRET_KEY', 'testing')
# 30 min
FORGOT_PASSWORD_TOKEN_EXPIRY = 1800

# client spa url
CLIENT_SPA_URL = os.getenv('CLIENT_SPA_URL', '')

TESTING = bool(os.getenv('TESTING', False))

# email
MAIL_SERVER = str(os.getenv('MAIL_SERVER', "smtp.mailgun.org"))

MAIL_PORT = int(os.getenv('MAIL_PORT', 465))

MAIL_USE_TLS = bool(os.getenv('MAIL_USE_TLS', False))

MAIL_USE_SSL = bool(os.getenv('MAIL_USE_SSL', True))

MAIL_USERNAME = str(os.getenv('MAIL_USERNAME', ''))

MAIL_PASSWORD = str(os.getenv('MAIL_PASSWORD', ''))

MAIL_SUPPRESS_SEND = bool(os.getenv('MAIL_SUPPRESS_SEND', False))
