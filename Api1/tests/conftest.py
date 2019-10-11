import os
import tempfile
import pytest
from Configs.appConfig import configureApp
from Configs.extensions import db

app = configureApp()


@pytest.fixture
def client():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    client = app.test_client()

    with app.app_context():
        db.create_all()

    yield client

    with app.app_context():
        db.drop_all()

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])
