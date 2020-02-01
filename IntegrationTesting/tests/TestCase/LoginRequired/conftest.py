import pytest
import tests.config as cfg
from tests.Pages.LoginPage import LoginPage
from tests.Pages.HomePage import HomePage


@pytest.fixture(scope="module")
def login(target_driver):
    print("*** login module scope setup ***")
    # set target driver ssize to desktop
    # this is because each driver has its differnt default ssize so make it consistent
    # don't need to worry about modify ssize here, this fixture is called before 'responsive_target'
    # fixture so it is overrided to collect ssize at the fixture.
    target_driver.set_window_size(cfg.ssize_width_tablet, cfg.ssize_height)

    login_page = LoginPage(target_driver)

    login_page.type_text_in_input(locator='email_input', text=cfg.test_user_email_for_profile)
    login_page.type_text_in_input(locator='password_input', text=cfg.test_user_password_for_profile)
    login_page.type_text_in_input(locator='confirm_input', text=cfg.test_user_password_for_profile)
    login_page.click_element('submit_btn')

    home_page = HomePage(target_driver, independent=False)

    home_page.wait_for_element('slogan')

    return home_page


@pytest.fixture(scope="module")
def login_for_profile(login):
    print("*** login_for_profile setup ***")
    home_page = login
    # be careful screen size (default size), so need to open toggle nav bar
    # click menu toggle icon
    home_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)
    home_page.click_element_in_header('account_menu_link')

    # need to logout as clean up (after yeild): to prevent other test from being affected


@pytest.fixture(scope="module")
def login_for_blog_management(login):
    print("*** login_for_blog_management setup ***")
    home_page = login
    home_page.click_element('to_manage_btn')

    # need to logout as clean up (after yeild): to prevent other test from being affected
