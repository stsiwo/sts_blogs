from werkzeug.datastructures import MultiDict
from typing import List, Dict


class QueryStringParser(object):

    def __init__(self):
        pass

    def parse(self, args: MultiDict) -> Dict:
        argsDict: Dict = {}
        for key, value in args.lists():
            if key == 'page' or key == 'limit':
                argsDict[key] = value[0]
            else:
                argsDict[key] = {
                        'value': value,
                        'orOp': False
                        }
        return argsDict
