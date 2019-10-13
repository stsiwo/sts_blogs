import os
import tempfile
import pytest
from Configs.appConfig import configureApp
from Configs.extensions import db
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from tests.data.seeder import seed

app = configureApp()


@pytest.fixture
def application():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True

    yield app

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])


@pytest.fixture
def database(application):

    with application.app_context():
        db.create_all()
        seed(db)

    yield db

    with application.app_context():
        db.drop_all()


@pytest.fixture
def client(database, application):
    yield application.test_client()


@pytest.fixture
def session():
    print("setup session")
    engine = create_engine('sqlite:////tmp/api1.db')
    session = scoped_session(sessionmaker(bind=engine))
    yield session
    session.rollback()
    print("teardown session")
