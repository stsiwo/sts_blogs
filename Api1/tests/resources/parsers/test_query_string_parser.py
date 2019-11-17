from Resources.parsers.QueryStringParser import QueryStringParser
from werkzeug.datastructures import MultiDict
from utils.util import printObject, _printObject


def test_query_string_parser():

    queryStringParser: QueryStringParser = QueryStringParser()
    dummyQueryStringMultiDict = MultiDict()
    dummyQueryStringMultiDict.add('limit', '30')
    dummyQueryStringMultiDict.add('page', '1')
    dummyQueryStringMultiDict.add('tags', 'tag1')
    dummyQueryStringMultiDict.add('tags', 'tag2')
    dummyQueryStringMultiDict.add('tags', 'tag3')
    dummyQueryStringMultiDict.add('tags', 'tag4')
    dummyQueryStringMultiDict.add('keyword', 'hey,hey')
    dummyQueryStringMultiDict.add('startDate', '1996-10-15T00:05:32.000Z')
    dummyQueryStringMultiDict.add('endDate', '1996-10-15T00:05:32.000Z')

    result = queryStringParser.parse(dummyQueryStringMultiDict)

    expectedResult = {
            'limit': '30',
            'page': '1',
            'tags': {
                'value': ['tag1', 'tag2', 'tag3', 'tag4'],
                'orOp': False
                },
            'keyword': {
                'value': ['hey,hey'],
                'orOp': False
                },
            'startDate': {
                'value': ['1996-10-15T00:05:32.000Z'],
                'orOp': False
                },
            'endDate': {
                'value': ['1996-10-15T00:05:32.000Z'],
                'orOp': False
                },
            }
    assert result == expectedResult
