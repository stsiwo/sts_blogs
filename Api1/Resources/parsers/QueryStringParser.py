from werkzeug.datastructures import MultiDict
from typing import List, Dict


class QueryStringParser(object):

    def __init__(self):
        pass

    def parse(self, args: MultiDict) -> Dict:
        argsDict: Dict = {}
        for key, value in args.lists():
            # if array value (e.g., tag1,tag2,tag3), map as separate item in list
            # might separate 'split' since other query string value might include ','
            # for now, not separate but #DOUBT
            argsDict[key] = {
                    'value': value,
                    'orOp': True
                    }
        return argsDict
