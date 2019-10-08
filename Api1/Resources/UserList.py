from flask_restful import Resource


class UserList(Resource):
    def get(self):
        return {"userList": "get"}

    def post(self):
        return {"userList": "get"}
