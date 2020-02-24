from Configs.app import app
from flask import Response, session
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies
    )
from typing import Dict
from Aop.loggingDecorator import loggingDecorator


class TokenService(object):

    def __init__(self):
        pass

    @loggingDecorator()
    def createJwtToken(self, response: Response, identity: Dict):

        # Create the tokens we will be sending back to the user
        access_token = create_access_token(identity=identity)
        refresh_token = create_refresh_token(identity=identity)

        app.logger.info(access_token)

        app.logger.info("about save token in cookie")
        self.__saveTokenInCookie(response, access_token, refresh_token)

    @loggingDecorator()
    def __saveTokenInCookie(self, response: Response, access_token: str, refresh_token: str):
        # Set the JWTs and the CSRF double submit protection cookies
        # in this response
        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)

        app.logger.info(session)
