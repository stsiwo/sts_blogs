from flask import Flask, jsonify, request
from flask_restful import Api
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)
from flask_sqlalchemy import SQLAlchemy
from Resources.User import User
from Resources.UserList import UserList

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
api = Api(app)

# NOTE: This is just a basic example of how to enable cookies. This is
#       vulnerable to CSRF attacks, and should not be used as is. See
#       csrf_protection_with_cookies.py for a more complete example!


# Configure application to store JWTs in cookies. Whenever you make
# a request to a protected endpoint, you will need to send in the
# access or refresh JWT via a cookie.
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

# Set the cookie paths, so that you are only sending your access token
# cookie to the access endpoints, and only sending your refresh token
# to the refresh endpoint. Technically this is optional, but it is in
# your best interest to not send additional cookies in the request if
# they aren't needed.
app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'

# Disable CSRF protection for this example. In almost every case,
# this is a bad idea. See examples/csrf_protection_with_cookies.py
# for how safely store JWTs in cookies
app.config['JWT_COOKIE_CSRF_PROTECT'] = False

# Set the secret key to sign the JWTs with
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!

jwt = JWTManager(app)


# Use the set_access_cookie() and set_refresh_cookie() on a response
# object to set the JWTs in the response cookies. You can configure
# the cookie names and other settings via various app.config options
@app.route('/token/auth', methods=['POST'])
def login():
    app.logger.info("logger test =============")
    username = request.form['username']
    password = request.form['password']
    if username != 'test' or password != 'test':
        return jsonify({'login': False}), 401

    # Create the tokens we will be sending back to the user
    access_token = create_access_token(identity=username)
    refresh_token = create_refresh_token(identity=username)

    # Set the JWT cookies in the response
    resp = jsonify({'login': True})
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp, 200


# Same thing as login here, except we are only setting a new cookie
# for the access token.
@app.route('/token/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    # Create the new access token
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)

    # Set the JWT access cookie in the response
    resp = jsonify({'refresh': True})
    set_access_cookies(resp, access_token)
    return resp, 200


# Because the JWTs are stored in an httponly cookie now, we cannot
# log the user out by simply deleting the cookie in the frontend.
# We need the backend to send us a response to delete the cookies
# in order to logout. unset_jwt_cookies is a helper function to
# do just that.
@app.route('/token/remove', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200


# We do not need to make any changes to our protected endpoints. They
# will all still function the exact same as they do when sending the
# JWT in via a header instead of a cookie
@app.route('/api/example', methods=['GET'])
@jwt_required
def protected():
    username = get_jwt_identity()
    return jsonify({'hello': 'from {}'.format(username)}), 200


# class UserDB(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#
#     def __repr__(self):
#         return '<User %r>' % self.username
#
#
# db.drop_all()
# db.create_all()
#
# db.session.add(UserDB(username='admin', email='admin1@example.com'))
# db.session.commit()
#
# user = UserDB.query.filter_by(username='admin').first()
#
# print(user)


api.add_resource(UserList, '/users')
api.add_resource(User, '/users/<user_id>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
