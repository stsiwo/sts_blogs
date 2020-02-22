from werkzeug.datastructures import MultiDict
from typing import List, Dict
from Aop.loggingDecorator import loggingDecorator


class QueryStringParser(object):

    def __init__(self):
        pass

    @loggingDecorator()
    def parse(self, args: MultiDict) -> Dict:
        argsDict: Dict = {}
        argsDict['orOp'] = False
        for key, value in args.lists():
            if key == 'orOp':
                argsDict[key] = True
            elif key == 'page' or key == 'limit' or key == 'sort':
                argsDict[key] = value[0]
            elif key == 'tags':
                argsDict[key] = {
                        'value': value[0].split(","),
                        'orOp': False  # don't use this for now
                        }
            else:
                argsDict[key] = {
                        'value': value,
                        'orOp': False  # don't use this for now
                        }
        return argsDict
