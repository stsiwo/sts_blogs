import pytest
from selenium import webdriver
from typing import Dict
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import urllib.parse
import queue

target_base_url = 'http://stsiwo.info'
seleniumServerUrl = 'http://127.0.0.1:4444/wd/hub'


@pytest.fixture(scope='session')
def target_driver(request):
    target_driver = webdriver.Remote(
             command_executor=seleniumServerUrl,
             desired_capabilities=DesiredCapabilities.CHROME
         )

    def fin():
        print('start teardown target_driver')
        target_driver.close()

    request.addfinalizer(fin)
    return target_driver


#  multiple screen size with fixture does not work!!
#  - run ssize change before the assertion
#    - this ends up assertion is done with the last screen size

# def get_driver_with_ssize(driver, x=425, y=1000):
#     driver.set_window_position(0, 0)
#     driver.set_window_size(x, y)
#     return driver
# 
# 
# @pytest.fixture(
#             params=[
#                 get_driver_with_ssize(target_driver, x=425, y=1000),
#                 get_driver_with_ssize(target_driver, x=768, y=1000),
#                 get_driver_with_ssize(target_driver, x=1024, y=1000),
#                 get_driver_with_ssize(target_driver, x=1440, y=1000)
#                 ]
#         )
# def params_fix(request):
#     return request.param
# 
# 
# @pytest.fixture(scope='session')
# def all_ssize(target_driver):
#     ssizes = [
#             get_driver_with_ssize(target_driver, x=425, y=1000),
#             get_driver_with_ssize(target_driver, x=768, y=1000),
#             get_driver_with_ssize(target_driver, x=1024, y=1000),
#             get_driver_with_ssize(target_driver, x=1440, y=1000)
#             ]
#     return {
#             'list': ssizes,
#             'pointer': -1
#             }
# 
# 
# @pytest.fixture()
# def target_browser_with_all_ssize(all_ssize):
#     print('start target_browser_with_all_ssize')
#     all_ssize['pointer'] = all_ssize['pointer'] + 1
#     if all_ssize['pointer'] == len(all_ssize['list']):
#         all_ssize['pointer'] = 0
# 
#     print(all_ssize['pointer'])
#     yield all_ssize['list'][all_ssize['pointer']]
#     print('teardown target_browser_with_all_ssize')
# 
# 
# @pytest.fixture(scope='session')
# def lte_laptop_size(target_driver):
#     ssizes = [
#             get_driver_with_ssize(target_driver, x=425, y=1000),
#             get_driver_with_ssize(target_driver, x=768, y=1000),
#             get_driver_with_ssize(target_driver, x=1024, y=1000),
#             ]
#     return {
#             'list': ssizes,
#             'pointer': -1
#             }
# 
# 
# @pytest.fixture()
# def target_browser_with_lte_laptop_size(lte_laptop_size):
#     print('start target_browser_with_lte_laptop_size')
#     lte_laptop_size['pointer'] = lte_laptop_size['pointer'] + 1
#     if lte_laptop_size['pointer'] == len(lte_laptop_size['list']):
#         lte_laptop_size['pointer'] = 0
# 
#     print(lte_laptop_size['pointer'])
#     yield lte_laptop_size['list'][lte_laptop_size['pointer']]
#     print('teardown target_browser_with_lte_laptop_size')
# 
# 
# @pytest.fixture(scope='session')
# def lte_tablet_size(target_driver):
#     ssizes = [
#             get_driver_with_ssize(target_driver, x=425, y=1000),
#             get_driver_with_ssize(target_driver, x=768, y=1000),
#             ]
#     return {
#             'list': ssizes,
#             'pointer': -1
#             }
# 
# 
# @pytest.fixture()
# def target_browser_with_lte_tablet_size(lte_tablet_size):
#     print('start target_browser_with_lte_tablet_size')
#     lte_tablet_size['pointer'] = lte_tablet_size['pointer'] + 1
#     if lte_tablet_size['pointer'] == len(lte_tablet_size['list']):
#         lte_tablet_size['pointer'] = 0
# 
#     print(lte_tablet_size['pointer'])
#     yield lte_tablet_size['list'][lte_tablet_size['pointer']]
#     print('teardown target_browser_with_lte_tablet_size')
# 
# 
# @pytest.fixture(scope='session')
# def desktop_ssize(target_driver):
#     ssizes = [
#             get_driver_with_ssize(target_driver, x=1440, y=1000)
#             ]
#     return {
#             'list': ssizes,
#             'pointer': -1
#             }
# 
# 
# @pytest.fixture()
# def target_browser_with_desktop_ssize(desktop_ssize):
#     print('start target_browser_with_desktop_ssize')
#     desktop_ssize['pointer'] = desktop_ssize['pointer'] + 1
#     if desktop_ssize['pointer'] == len(desktop_ssize['list']):
#         desktop_ssize['pointer'] = 0
# 
#     print(desktop_ssize['pointer'])
#     yield desktop_ssize['list'][desktop_ssize['pointer']]
#     print('teardown target_browser_with_desktop_ssize')
# 
# 
# @pytest.fixture(scope='session')
# def gte_laptop_ssize(target_driver):
#     ssizes = [
#             get_driver_with_ssize(target_driver, x=1024, y=1000),
#             get_driver_with_ssize(target_driver, x=1440, y=1000)
#             ]
#     return {
#             'list': ssizes,
#             'pointer': -1
#             }
# 
# 
# @pytest.fixture()
# def target_browser_with_gte_laptop_ssize(gte_laptop_ssize):
#     print('start target_browser_with_gte_laptop_ssize')
#     gte_laptop_ssize['pointer'] = gte_laptop_ssize['pointer'] + 1
#     if gte_laptop_ssize['pointer'] == len(gte_laptop_ssize['list']):
#         gte_laptop_ssize['pointer'] = 0
# 
#     print(gte_laptop_ssize['pointer'])
#     yield gte_laptop_ssize['list'][gte_laptop_ssize['pointer']]
#     print('teardown target_browser_with_gte_laptop_ssize')
# 
# 
# @pytest.fixture(scope='session')
# def gte_tablet_ssize(target_driver):
#     ssizes = [
#             get_driver_with_ssize(target_driver, x=768, y=1000),
#             get_driver_with_ssize(target_driver, x=1024, y=1000),
#             get_driver_with_ssize(target_driver, x=1440, y=1000)
#             ]
#     return {
#             'list': ssizes,
#             'pointer': -1
#             }
# 
# 
# @pytest.fixture()
# def target_browser_with_gte_tablet_ssize(gte_tablet_ssize):
#     print('start target_browser_with_gte_tablet_ssize')
#     gte_tablet_ssize['pointer'] = gte_tablet_ssize['pointer'] + 1
#     if gte_tablet_ssize['pointer'] == len(gte_tablet_ssize['list']):
#         gte_tablet_ssize['pointer'] = 0
# 
#     print(gte_tablet_ssize['pointer'])
#     yield gte_tablet_ssize['list'][gte_tablet_ssize['pointer']]
#     print('teardown target_browser_with_gte_tablet_ssize')
# 
# 
# def pytest_generate_tests(metafunc):
#     print('start pytest_generate_tests')
#     if 'target_browser_with_all_ssize' in metafunc.fixturenames:
#         metafunc.parametrize(
#                 'target_browser_with_all_ssize',
#                 ['mobile', 'tablet', 'laptop', 'desktop'],  # number of element must match with sizes['list']
#                 indirect=True)
# 
#     if 'target_browser_with_lte_laptop_size' in metafunc.fixturenames:
#         metafunc.parametrize(
#                 'target_browser_with_lte_laptop_size',
#                 ['mobile', 'tablet', 'laptop'],  # number of element must match with sizes['list']
#                 indirect=True)
# 
#     if 'target_browser_with_lte_tablet_size' in metafunc.fixturenames:
#         metafunc.parametrize(
#                 'target_browser_with_lte_tablet_size',
#                 ['mobile', 'tablet'],  # number of element must match with sizes['list']
#                 indirect=True)
# 
#     if 'target_browser_with_desktop_ssize' in metafunc.fixturenames:
#         metafunc.parametrize(
#                 'target_browser_with_desktop_ssize',
#                 ['desktop'],  # number of element must match with sizes['list']
#                 indirect=True)
# 
#     if 'target_browser_with_gte_laptop_ssize' in metafunc.fixturenames:
#         metafunc.parametrize(
#                 'target_browser_with_gte_laptop_ssize',
#                 ['laptop', 'desktop'],  # number of element must match with sizes['list']
#                 indirect=True)
# 
#     if 'target_browser_with_gte_tablet_ssize' in metafunc.fixturenames:
#         metafunc.parametrize(
#                 'target_browser_with_gte_tablet_ssize',
#                 ['tablet', 'laptop', 'desktop'],  # number of element must match with sizes['list']
#                 indirect=True)


# called every test func
@pytest.fixture
def target_driver_with_base_url(target_driver):
    target_driver.get('http://stsiwo.info')
    # need this one to avoid 'NosuchElementException'
    # - esp for when find element by link test
    # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
    target_driver.implicitly_wait(10)
    return target_driver


@pytest.fixture
def target_driver_with_base_url_with_mobile_ssize(target_driver_with_base_url):
    target_driver_with_base_url.set_window_position(0, 0)
    target_driver_with_base_url.set_window_size(425, 1000)
    return target_driver_with_base_url


@pytest.fixture
def target_driver_with_base_url_with_tablet_ssize(target_driver_with_base_url):
    target_driver_with_base_url.set_window_position(0, 0)
    target_driver_with_base_url.set_window_size(768, 1000)
    return target_driver_with_base_url


@pytest.fixture
def target_driver_with_base_url_with_laptop_ssize(target_driver_with_base_url):
    target_driver_with_base_url.set_window_position(0, 0)
    target_driver_with_base_url.set_window_size(1024, 1000)
    return target_driver_with_base_url


@pytest.fixture
def target_driver_with_base_url_with_desktop_ssize(target_driver_with_base_url):
    target_driver_with_base_url.set_window_position(0, 0)
    target_driver_with_base_url.set_window_size(1440, 1000)
    return target_driver_with_base_url


# # def pytest_addoption(parser):
# #     parser.addoption(
# #         "--user", action="store", default="all", help="target user; 'guest', 'member', or 'amdin'"
# #         )
# #     parser.addoption(
# #         "--page", action="store", default="all", help="target page; 'home', 'login', or 'signup'"
# #         )
# #     parser.addoption(
# #         "--ssize", action="store", default="all", help="target ssize; 'mobile', 'tablet', 'laptop', or 'desktop'"
# #         )
# #     parser.addoption(
# #         "--browser", action="store", default="all", help="target browser; 'chrome', 'firefox', 'edge', or 'ie'"
# #         )
# 
# 
# # @pytest.fixture
# # def targets(request):
# #     print('start setup targets')
# #     targets = {
# #             'user': request.config.getoption("--user"),
# #             'page': request.config.getoption("--page"),
# #             'ssize': request.config.getoption("--ssize"),
# #             'browser': request.config.getoption("--browser"),
# #             }
# #     print('args:')
# #     print(targets)
# #     return targets
# # 
# # 
# # @pytest.fixture
# # def target_browser(targets, request):
# #     print('start setup target_browser')
# #     target_browser = None
# #     if targets.get('browser') == 'chrome':
# #         target_browser = webdriver.Remote(
# #             command_executor=seleniumServerUrl,
# #             desired_capabilities=DesiredCapabilities.CHROME
# #         )
# #     elif targets.get('browser') == 'firefox':
# #         target_browser = webdriver.Remote(
# #             command_executor=seleniumServerUrl,
# #             desired_capabilities=DesiredCapabilities.FIREFOX
# #         )
# #     else:
# #         target_browser = webdriver.Remote(
# #             command_executor=seleniumServerUrl,
# #             desired_capabilities=DesiredCapabilities.CHROME
# #         )
# # 
# #     def fin():
# #         print('start teardown target_browser')
# #         target_browser.close()
# # 
# #     request.addfinalizer(fin)
# #     return target_browser
# # 
# # 
# # # page config
# # @pytest.fixture
# # def target_page(targets, target_browser):
# #     target_page = None
# #     if targets.get('page') == 'home':
# #         target_page = target_base_url
# #     elif targets.get('page') == 'signup':
# #         target_page = urllib.parse.urljoin(target_base_url, "/signup")
# #     elif targets.get('page') == 'login':
# #         target_page = urllib.parse.urljoin(target_base_url, "/login")
# #     else:
# #         target_page = target_base_url
# #     target_browser.get(target_page)
# #     return target_page
# # 
# # 
# # # page config
# # @pytest.fixture
# # def target_ssize(targets, target_browser):
# #     target_ssize = None
# #     if targets.get('ssize') == 'mobile':
# #         target_ssize = 425
# #     elif targets.get('ssize') == 'tablet':
# #         target_ssize = 768
# #     elif targets.get('ssize') == 'laptop':
# #         target_ssize = 1024
# #     elif targets.get('ssize') == 'desktop':
# #         target_ssize = 1440
# #     else:
# #         target_ssize = 425
# #     target_browser.set_window_position(target_ssize, 0)
# #     yield target_ssize
# # 
# # 
# # @pytest.fixture
# # def test():
# #     return ['test_fix', 'test1_fix']
# 
# # @pytest.fixture
# # def target_browser():
# #     pass
# # 
# # 
# # def get_chrome_browser():
# #     return webdriver.Remote(
# #             command_executor=seleniumServerUrl,
# #             desired_capabilities=DesiredCapabilities.CHROME
# #         )
# # 
# # 
# # def get_firefox_browser():
# #     return webdriver.Remote(
# #             command_executor=seleniumServerUrl,
# #             desired_capabilities=DesiredCapabilities.FIREFOX
# #         )
# # 
# # 
# # def pytest_generate_tests(metafunc):
# #     if 'target_browser' in metafunc.fixturenames:
# #         if 'all' == metafunc.config.getoption('browser'):
# #             if 'all' ==
# #             metafunc.parametrize(
# #                     'target_browser',
# #                     [
# #                         get_chrome_browser(),
# #                         get_firefox_browser()
# #                     ],
# #                     indirect=True)
# #         if 'chrome' == metafunc.config.getoption('browser'):
# #             metafunc.parametrize(
# #                     'target_browser',
# #                     [get_chrome_browser()],
# #                     indirect=True)
# #         if 'firefox' == metafunc.config.getoption('browser'):
# #             metafunc.parametrize(
# #                     'target_browser',
# #                     [get_firefox_browser()],
# #                     indirect=True)
#     # if 'all' == metafunc.config.getoption('user'):
#     #     if 'target_user' in metafunc.fixturenames:
#     #         metafunc.parametrize('target_user', ['guest', 'member', 'admin'])
#     # if 'all' == metafunc.config.getoption('ssize'):
#     #     if 'target_ssize' in metafunc.fixturenames:
#     #         metafunc.parametrize('target_ssize', ['mobile', 'tablet', 'laptop', 'desktop'], indirect=True)
#     # if 'all' == metafunc.config.getoption('ssize'):
#     #     if 'target_page' in metafunc.fixturenames:
#     #         metafunc.parametrize('target_page', ['home', 'login', 'signup'], indirect=True)
#     # if "app" in metafunc.fixturenames:
#     #     metafunc.parametrize('app', ['app1', 'app2'])
# 
# 
# # @pytest.fixture(autouse=True)
# # def skip_test(request):
# #     print(request.node.get_closest_marker('selenium'))
# #     if request.node.get_closest_marker('selenium'):
# #         if request.node.get_closest_marker('selenium').kwargs['user'] == 'guest':
# #             pytest.skip('skippped')
