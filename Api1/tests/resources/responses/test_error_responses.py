from Resources.responses.errorResponses.BadSignatureErrorResponse import BadSignatureErrorResponse
from utils.util import printObject


def test_error_response():
    badResponse = BadSignatureErrorResponse()

    printObject(badResponse)

    assert 0
