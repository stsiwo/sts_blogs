import pytest
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from tests.Pages.HomePage import HomePage
from tests.Pages.SignupPage import SignupPage
from tests.Pages.LoginPage import LoginPage
import tests.config as cfg


def pytest_addoption(parser):
    parser.addoption(
        "--driver", action="store", default="all", help="type of driver you want to use with test. available options: {}".format(cfg.available_driver_options)
    )
    parser.addoption(
        "--ssize", action="store", default="all", help="type of screen size you want to use with test. available options: {}".format(cfg.available_ssize_options)
    )
    parser.addoption(
        "--page", action="store", default="all", help="type of page you want to use with test. available options: {}".format(cfg.available_page_options)
    )


@pytest.fixture(params=cfg.available_driver_options, scope='session')
def target_driver(request):
    driver_option = request.config.getoption('--driver')
    print(driver_option)

    # skip not selected driver by command line option
    if driver_option != 'all' and driver_option != request.param:
        pytest.skip('skipped on this size because of command line option: {}'.format(driver_option))

    if 'chrome' == request.param:
        print('target driver is chrome')
        target_driver = webdriver.Remote(
                 command_executor=cfg.seleniumServerUrl,
                 desired_capabilities=DesiredCapabilities.CHROME
             )
    if 'firefox' == request.param:
        print('target driver is firefox')
        target_driver = webdriver.Remote(
                 command_executor=cfg.seleniumServerUrl,
                 desired_capabilities=DesiredCapabilities.FIREFOX
             )

    def fin():
        print('start teardown target_driver')
        target_driver.close()

    request.addfinalizer(fin)
    return target_driver


@pytest.fixture(params=cfg.available_ssize_options)
def responsive_target(target_driver, request):
    target_driver.set_window_position(0, 0)
    if 'mobile' == request.param:
        model_size = {'width': cfg.ssize_width_mobile, 'height': cfg.ssize_height}
        target_driver.set_window_size(model_size['width'], model_size['height'])
    if 'tablet' == request.param:
        model_size = {'width': cfg.ssize_width_tablet, 'height': cfg.ssize_height}
        target_driver.set_window_size(model_size['width'], model_size['height'])
    if 'laptop' == request.param:
        model_size = {'width': cfg.ssize_width_laptop, 'height': cfg.ssize_height}
        target_driver.set_window_size(model_size['width'], model_size['height'])
    if 'desktop' == request.param:
        model_size = {'width': cfg.ssize_width_desktop, 'height': cfg.ssize_height}
        target_driver.set_window_size(model_size['width'], model_size['height'])
    return {
            'driver': target_driver,
            'size_type': request.param,
            'model_size': model_size
            }


@pytest.fixture(params=cfg.available_page_options)
def TargetPage(request):
    if 'home' == request.param:
        return HomePage
    if 'signup' == request.param:
        return SignupPage
    if 'login' == request.param:
        return LoginPage


@pytest.fixture(autouse=True)
def selective_marks(request, responsive_target, TargetPage):
    ssize_option = request.config.getoption('--ssize')
    available_ssize_command_options = [*cfg.available_ssize_options, 'all']

    if ssize_option not in available_ssize_command_options:
        raise Exception('provided ssize option ({}) is not supoorted. available options are {}'.format(ssize_option, available_ssize_command_options))

    if request.node.get_closest_marker('responsive'):
        # if test function does hot have responsive mark with its ssize, skip
        if responsive_target.get('size_type') not in request.node.get_closest_marker('responsive').kwargs['size']:
            pytest.skip('skipped on this size because of marks: {}'.format(responsive_target.get('size_type')))

        # also, if command line option is specified about ssize and current fixture parameter is not match, skip because it is not specified ssize by user
        if ssize_option != 'all' and ssize_option not in responsive_target['size_type']:
            pytest.skip('skipped on this size because of command line option: {} is not {}'.format(ssize_option, responsive_target['size_type']))

    page_option = request.config.getoption('--page')
    available_page_command_options = [*cfg.available_page_options, 'all']

    if page_option not in available_page_command_options:
        raise Exception('provided page option ({}) is not supoorted. available options are {}'.format(page_option, available_ssize_command_options))

    if request.node.get_closest_marker('page'):
        if TargetPage.name not in request.node.get_closest_marker('page').kwargs['page']:
            pytest.skip('skipped on this size because of not selected marks: {}'.format(TargetPage.name))

        if page_option != 'all' and page_option != TargetPage.name:
            pytest.skip('skipped on this page because of command line option: {} is not {}'.format(page_option, TargetPage.name))
