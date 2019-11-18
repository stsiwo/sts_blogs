import pytest
from Infrastructure.DataModels.UserModel import User
import os
from utils.util import printObject


@pytest.mark.uploaded_src
def test_ui01_uploaded_image_get_endpoint_should_return_existing_image(application, client, exSession, usersSeededFixture, setupTempUploadDirWithImageFile, testExistingFileStorage):

    user = exSession.query(User).filter(User.email == 'test@test.com').first()

    imgUrl = os.path.join('/', application.config['PUBLIC_FILE_FOLDER'], str(user.id), testExistingFileStorage.filename)

    response = client.get(imgUrl)

    assert response.status_code == 200
