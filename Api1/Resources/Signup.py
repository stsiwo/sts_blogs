from flask_restful import Resource, reqparse
from flask import request, redirect
from Configs.extensions import db
from Configs.extensions import api
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from Resources.Token import TokenAuth


class Signup(Resource):
    # create new user
    def post(self):
        parser = reqparse.RequestParser(bundle_errors=True)
        # need to re-implement this request validation
        # REFACTOR
        parser.add_argument('name', type=str, required=True, help='name is required')
        parser.add_argument('email', type=str, required=True, help='email is required')
        parser.add_argument('password', type=str, required=True, help='password is required')
        args = parser.parse_args(strict=True)

        # get 'member' role from db
        memberRole = Role.query.filter_by(name='member').first()

        print("memberRole: ")
        print(memberRole)

        # create new User
        newUser = User(
                name=request.json.get('name'),
                email=request.json.get('email'),
                password=request.json.get('password'),
                roles=[memberRole]
                )

        # save to db
        db.session.add(newUser)
        db.session.commit()

        return redirect(api.url_for(TokenAuth, user=newUser, _method='POST'), code=301)
