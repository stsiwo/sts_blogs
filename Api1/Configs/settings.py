from dotenv import load_dotenv
import os
from pathlib import Path

# env file
env_path = Path('.').parent / '.env'
load_dotenv(dotenv_path=env_path)

# jwt config

# Configure application to store JWTs in cookies
JWT_TOKEN_LOCATION = ['cookies']

# Only allow JWT cookies to be sent over https. In production, this
# should likely be True
JWT_COOKIE_SECURE = os.getenv('JWT_COOKIE_SECURE', False)

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
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'super-secret')

# db config
SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/api1.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False

# image files
UPLOAD_FOLDER = 'uploads'
PUBLIC_FILE_FOLDER = 'images'

# custome error handling
# PROPAGATE_EXCEPTIONS = True

# original config parameters
UPLOAD_ENDPOINT = '/{}'.format(UPLOAD_FOLDER)

# itsdangrous
SIGNER_SECRET_KEY = os.getenv('SIGNER_SECRET_KEY')
# 30 min
FORGOT_PASSWORD_TOKEN_EXPIRY = 1800

# client spa url
CLIENT_SPA_URL = os.getenv('CLIENT_SPA_URL', 'http://localhost')

# yagmail
# MYGMAIL_USERNAME = os.getenv('MYGMAIL_USERNAME')
# MYGMAIL_PASSWORD = os.getenv('MYGMAIL_PASSWORD')
