import pprint
from collections.abc import Iterable

pp = pprint.PrettyPrinter()


def prettyPrint(target):
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


def _isPrimitive(obj):
    return not hasattr(obj, '__dict__')


def _printObject(target: object):
    props = vars(target)
    prettyPrint([(key, props[key]) for key in props])
