from tests.Pages.LoginPage import LoginPage
from tests.Pages.SignupPage import SignupPage
from tests.Pages.HomePage import HomePage
import tests.config as cfg
import pytest
import marks
pytestmark = [marks.login_page, pytest.mark.login]


# LOGIN
# email input
@marks.all_ssize
def test_singup_page_should_display_email_input_empty_validation_error_when_it_is_focused(responsive_target):

    login_page = LoginPage(responsive_target['driver'])

    # open search input
    login_page.click_element('email_input')
    # enter text in the input
    assert login_page.does_have_text_in_page('email is a required field')


# TODO: implement other validation rules about name
# https://app.clickup.com/t/3m51pz

# password input
@marks.all_ssize
def test_singup_page_should_display_password_input_empty_validation_error_when_it_is_focused(responsive_target):

    login_page = LoginPage(responsive_target['driver'])

    # open search input
    login_page.click_element('password_input')
    # enter text in the input
    assert login_page.does_have_text_in_page('password is a required field')


# TODO: implement other validation rules about name
# https://app.clickup.com/t/3m51pz


# confirm input
@marks.all_ssize
def test_singup_page_should_display_confirm_input_empty_validation_error_when_it_is_focused(responsive_target):

    login_page = LoginPage(responsive_target['driver'])

    # open search input
    login_page.click_element('confirm_input')
    # enter text in the input
    assert login_page.does_have_text_in_page('confirm is a required field')


# TODO: implement other validation rules about name
# https://app.clickup.com/t/3m51pz


@marks.all_ssize
def test_singup_page_should_not_allow_to_submit_when_at_least_one_error(responsive_target):

    login_page = LoginPage(responsive_target['driver'])

    # open search input
    login_page.click_element('confirm_input')

    login_page.click_element('submit_btn')

    assert login_page.does_have_text_in_page('please fix validation errors before submit')


# TODO: DUPLICATED EMAIL DETECTION FEATURE (TYPE AHEAD feature)
# https://app.clickup.com/t/3jbyh7


# TODO: FORGOT PASSWORD FEATURE
# https://app.clickup.com/t/3jbyqd

@marks.all_ssize
def test_singup_page_should_route_login_page_when_click_the_link(responsive_target):

    login_page = LoginPage(responsive_target['driver'])

    # open search input
    login_page.click_element('signup_link')

    login_page = SignupPage(responsive_target['driver'], independent=False)

    assert login_page.does_have_text_in_page('Signup')


@marks.all_ssize
@pytest.mark.submit
def test_singup_page_should_route_home_page_when_successfully_login(responsive_target):

    login_page = LoginPage(responsive_target['driver'])

    login_page.type_text_in_input(locator='email_input', text=cfg.test_user_email)
    login_page.type_text_in_input(locator='password_input', text=cfg.test_user_password)
    login_page.type_text_in_input(locator='confirm_input', text=cfg.test_user_password)

    login_page.click_element('submit_btn')

    home_page = HomePage(responsive_target['driver'], independent=False)

    # if fetch and move pages, you need to wait for fetch done and next page is loaded like below otherwise, selenium can assert before target element is loaded
    home_page.wait_for_element('slogan')

    assert home_page.does_have_text_in_page('Share Your Knowledge and Expand What You Can Do')


@marks.all_ssize
@pytest.mark.submit
def test_singup_page_should_display_fetch_error_message_when_provided_email_does_not_registered(responsive_target):

    login_page = LoginPage(responsive_target['driver'])

    login_page.type_text_in_input(locator='email_input', text="email@doesnot.exist")
    login_page.type_text_in_input(locator='password_input', text=cfg.test_user_password)
    login_page.type_text_in_input(locator='confirm_input', text=cfg.test_user_password)

    login_page.click_element('submit_btn')

    login_page.wait_for_element('fetch_err_msg')

    assert login_page.does_have_text_in_page("provided email is not found")


@marks.all_ssize
@pytest.mark.submit
def test_singup_page_should_display_fetch_error_message_when_provided_password_is_invalid(responsive_target):

    login_page = LoginPage(responsive_target['driver'])

    login_page.type_text_in_input(locator='email_input', text=cfg.test_user_email)
    login_page.type_text_in_input(locator='password_input', text="invalid_password")
    login_page.type_text_in_input(locator='confirm_input', text="invalid_password")

    login_page.click_element('submit_btn')

    login_page.wait_for_element('fetch_err_msg')

    assert login_page.does_have_text_in_page("entered password is invalid.")
