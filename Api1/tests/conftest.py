import os
import tempfile
import pytest
from Configs.appConfig import main
from Configs.extensions import db
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from tests.data.seeder import seed

app = main


@pytest.fixture
def application():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True

    yield app

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])


# use addfinalizer to execute teardown code even when exception is thrown
@pytest.fixture
def database(application, request):

    def fin():
        print("teardown database ...")
        with application.app_context():
            clear_data(db)

    request.addfinalizer(fin)
    return db


def clear_data(session):
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print('Clear table %s' % table)
        db.session.execute(table.delete())
    db.session.commit()


@pytest.fixture
def client(database, application):
    yield application.test_client()


@pytest.fixture
def session():
    print("setup session fixture")
    # enable echo executed query statement
    # engine = create_engine('sqlite:////tmp/api1.db', echo=True)
    engine = create_engine('sqlite:////tmp/api1.db')
    session = scoped_session(sessionmaker(bind=engine))
    yield session
    session.rollback()
    print("teardown session fixture")
