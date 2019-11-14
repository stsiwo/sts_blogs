import pytest
from flask import Response


@pytest.mark.aop
def test_aop_01_every_response_should_have_cors_headers(client):

    response: Response = client.get('/blogs/111111/comments')
    assert response.headers['Access-Control-Allow-Origin'] is not None
