import pprint
from collections.abc import Iterable


def prettyPrint(target):
    pp = pprint.PrettyPrinter()
    pp.pprint(target)


def printObject(target):

    # if target is iterable
    if isinstance(target, Iterable):
        for obj in target:
            _printObject(obj)
    # if target is object
    else:
        _printObject(target)


def _printObject(target: object):
    props = vars(target)
    prettyPrint([(key, props[key]) for key in props])
