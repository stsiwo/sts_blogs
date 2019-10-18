import pprint
from collections.abc import Iterable
import json


def prettyPrint(target):
    pp = pprint.PrettyPrinter()
    pp.pprint(target)


def printObject(target):

    print(type(target))

    if _isPrimitive(target):
        print(target)

    # if target is iterable
    elif isinstance(target, Iterable):
        for obj in target:
            _printObject(obj)
    # if target is object
    else:
        _printObject(target)


def _printObject(target: object):
    print(type(target))
    props = vars(target)
    prettyPrint([(key, props[key]) for key in props])


def decodeResponseByteJsonToDictionary(target: bytes):
    return json.loads(target.decode("utf-8"))


def _isPrimitive(obj):
    return not hasattr(obj, '__dict__')
