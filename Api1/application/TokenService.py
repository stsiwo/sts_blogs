from Configs.app import app
from flask import Response, session
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies
    )
from typing import Dict
import utils


class TokenService(object):

    def __init__(self):
        pass

    def createJwtToken(self, response: Response, identity: Dict):
        app.logger.info("start create jwt token service")
        print("start create jwt token service")
        print("start create jwt token service1")

        # Create the tokens we will be sending back to the user
        access_token = create_access_token(identity=identity)
        refresh_token = create_refresh_token(identity=identity)

        utils.printObject(access_token)

        print("about save token in cookie")
        self.__saveTokenInCookie(response, access_token, refresh_token)

    def __saveTokenInCookie(self, response: Response, access_token: str, refresh_token: str):
        """ private method so don't use from outside """
        print("start storing tokens in cookie in response")
        # Set the JWTs and the CSRF double submit protection cookies
        # in this response
        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)

        utils.printObject(session)
