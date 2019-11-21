import pytest


@pytest.fixture
def sampleFixture():
    print('set up sample fixture')

    yield None
    print('tear down sample fixture')
