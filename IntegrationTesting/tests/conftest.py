import pytest
from selenium import webdriver
from typing import Dict
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import urllib.parse

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


# called every test func
@pytest.fixture
def target_driver_with_base_url(target_driver):
    target_driver.get('http://stsiwo.info')
    # need this one to avoid 'NosuchElementException'
    # - esp for when find element by link test
    # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
    target_driver.implicitly_wait(10)
    return target_driver


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
