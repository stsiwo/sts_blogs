import pprint


def prettyPrint(target):
    pp = pprint.PrettyPrinter()
    pp.pprint(target)


def printObject(target: object):

    props = vars(target)

    prettyPrint([(key, props[key]) for key in props])
