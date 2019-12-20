import pprint
from collections.abc import Iterable
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException

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


def wait_for_element(driver, locator_by, locator_value):
    try:
        myElem = WebDriverWait(driver, 3).until(EC.presence_of_element_located((locator_by, locator_value)))
        print("Page is ready!")
    except TimeoutException:
        print("Loading took too much time!")
