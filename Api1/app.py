from flask import Flask
from flask_restful import Api
from Resources.User import User
from Resources.UserList import UserList

app = Flask(__name__)
api = Api(app)

api.add_resource(UserList, '/users')
api.add_resource(User, '/users/<user_id>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
