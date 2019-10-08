from flask_restful import Resource


class User(Resource):
    def get(self):
        return {"user": "get"}

    def post(self):
        return {"user": "get"}
