import pytest
from typing import Dict


@pytest.fixture
def app():
    print('setup app fixture')

    app: Dict = {
            "url": 'http://0.0.0.0:8080'
            }

    yield app
    print('tear down app fixture')
