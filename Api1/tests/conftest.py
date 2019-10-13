import os
import tempfile
import pytest
from Configs.appConfig import configureApp
from Configs.extensions import db
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

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


@pytest.fixture
def session():
    print("setup session")
    engine = create_engine('sqlite:////tmp/api1.db')
    session = scoped_session(sessionmaker(bind=engine))
    yield session
    session.rollback()
    print("teardown session")
