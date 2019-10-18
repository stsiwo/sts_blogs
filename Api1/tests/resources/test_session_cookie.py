from flask import Response
from Infrastructure.DataModels.UserModel import User
import utils


def test_session_cookie(application, database, rolesSeededFixture, blogsSeededFixture, authedClient):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id

    response = authedClient.get('/users/' + str(userId) + '/blogs')

    utils.printObject(response.data)

    assert response.status_code == 200
