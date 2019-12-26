from flask import Response
from Infrastructure.DataModels.UserModel import User
from utils.util import printObject


def test_session_cookie(application, database, blogsSeededFixture, authedClient):

    userId = None

    with application.app_context():
        user = database.session.query(User).first()
        userId = user.id

    csrf_token = [cookie.value for cookie in authedClient.cookie_jar if cookie.name == 'csrf_access_token'][0]

    response = authedClient.get('/users/' + str(userId) + '/blogs', headers={'X-CSRF-TOKEN': csrf_token})

    printObject(response.data)

    assert response.status_code == 200
