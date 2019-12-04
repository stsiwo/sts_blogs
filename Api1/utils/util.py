import pprint
from collections.abc import Iterable
import json
from datetime import datetime
from typing import Dict


def ppDict(target: Dict, indent=0):
    for key, value in target.items():
        if isinstance(value, dict):
            print('/t' + str(key) + ": ")
            ppDict(value)
        else:
            print('\t' + str(key) + ': ' + str(value))


def prettyPrint(target):
    pp = pprint.PrettyPrinter()
    pp.pprint(target)


def printObject(target):

    print(type(target))

    if _isPrimitive(target):
        print('target is primitive')
        print(target)

    # if target is iterable
    elif isinstance(target, Iterable):
        print('target is iterable')
        for obj in target:
            _printObject(obj)
    # if target is object
    else:
        print('target is object')
        _printObject(target)


def _printObject(target: object):
    props = vars(target)
    prettyPrint([(key, props[key]) for key in props])


def decodeResponseByteJsonToDictionary(target: bytes):
    return json.loads(target.decode("utf-8"))


def _isPrimitive(obj):
    return not hasattr(obj, '__dict__')


def parseStrToDate(value: str):
    return datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%fZ')
