from Resources.parsers.QueryStringParser import QueryStringParser
from werkzeug.datastructures import MultiDict
from utils.util import printObject


def test_query_string_parser():

    queryStringParser: QueryStringParser = QueryStringParser()
    dummyQueryStringMultiDict = MultiDict()
    dummyQueryStringMultiDict['limit'] = '30'
    dummyQueryStringMultiDict['offset'] = '0'
    dummyQueryStringMultiDict['tags'] = 'tag1'
    dummyQueryStringMultiDict['tags'] = 'tag2'
    dummyQueryStringMultiDict['tags'] = 'tag3'
    dummyQueryStringMultiDict['tags'] = 'tag4'
    dummyQueryStringMultiDict['keyword'] = 'hey,hey'
    dummyQueryStringMultiDict['startDate'] = '1996-10-15T00:05:32.000Z'
    dummyQueryStringMultiDict['endDate'] = '1996-10-15T00:05:32.000Z'

    result = queryStringParser.parse(dummyQueryStringMultiDict)

    printObject(result)
    assert 0
