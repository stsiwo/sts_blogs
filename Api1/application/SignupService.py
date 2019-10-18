from Configs.app import app
from flask import request, jsonify
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from Configs.extensions import db
from Infrastructure.transactionDecorator import db_transaction
from application.TokenService import TokenService
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies
    )


class SignupService(object):

    _tokenService: TokenService

    def __init__(self):
        self._tokenService = TokenService()

    @db_transaction()
    def registerUserService(self):
        app.logger.info("start register user service")
        print("start register user service")

        # get 'member' role from db
        memberRole = db.session.query(Role).filter_by(name='member').first()

        # create new User
        newUser = User(
                name=request.json.get('name'),
                email=request.json.get('email'),
                password=request.json.get('password'),
                roles=[memberRole]
                )

        # save to db
        db.session.add(newUser)
        newUser = db.session.query(User).filter_by(email=newUser.email).first()

        # construct response
        response = jsonify({'success': True})
        response.status_code = 200

        # create jwt tokens
        self._tokenService.createJwtToken(
             response,
             {
                 'id': newUser.id,
                 "name": newUser.name,
                 "roles": [role.name for role in newUser.roles]
             })

        return response
