from tests.Pages.SignupPage import SignupPage
from tests.Pages.LoginPage import LoginPage
from tests.Pages.HomePage import HomePage
import pytest
import marks
import tests.config as cfg
from tests.data.faker import fake
pytestmark = [marks.signup_page, pytest.mark.signup]


# SIGNUP
@marks.all_ssize
def test_singup_page_should_not_display_any_validation_error_message_when_initial_load(responsive_target):

    signup_page = SignupPage(responsive_target['driver'])

    # enter text in the input
    assert not signup_page.does_element_exist('name_error')


# name input
@marks.all_ssize
def test_singup_page_should_display_name_input_empty_validation_error_when_it_is_focused(responsive_target):

    signup_page = SignupPage(responsive_target['driver'])

    # open search input
    signup_page.click_element('name_input')
    # enter text in the input
    assert signup_page.does_have_text_in_page('name is a required field')


# TODO: implement other validation rules about name


# email input
@marks.all_ssize
def test_singup_page_should_display_email_input_empty_validation_error_when_it_is_focused(responsive_target):

    signup_page = SignupPage(responsive_target['driver'])

    # open search input
    signup_page.click_element('email_input')
    # enter text in the input
    assert signup_page.does_have_text_in_page('email is a required field')


# TODO: implement other validation rules about name


# password input
@marks.all_ssize
def test_singup_page_should_display_password_input_empty_validation_error_when_it_is_focused(responsive_target):

    signup_page = SignupPage(responsive_target['driver'])

    # open search input
    signup_page.click_element('password_input')
    # enter text in the input
    assert signup_page.does_have_text_in_page('password is a required field')


# TODO: implement other validation rules about name


# confirm input
@marks.all_ssize
def test_singup_page_should_display_confirm_input_empty_validation_error_when_it_is_focused(responsive_target):

    signup_page = SignupPage(responsive_target['driver'])

    # open search input
    signup_page.click_element('confirm_input')
    # enter text in the input
    assert signup_page.does_have_text_in_page('confirm is a required field')


# TODO: implement other validation rules about name


@marks.all_ssize
def test_singup_page_should_not_allow_to_submit_when_at_least_one_error(responsive_target):

    signup_page = SignupPage(responsive_target['driver'])

    # open search input
    signup_page.click_element('confirm_input')

    signup_page.click_element('submit_btn')

    assert signup_page.does_have_text_in_page('please fix validation errors before submit')


@marks.all_ssize
def test_singup_page_should_route_login_page_when_click_the_link(responsive_target):

    signup_page = SignupPage(responsive_target['driver'])

    # open search input
    signup_page.click_element('login_link')

    login_page = LoginPage(responsive_target['driver'], independent=False)

    assert login_page.does_have_text_in_page('Login')


@marks.all_ssize
@pytest.mark.submit
def test_singup_page_should_route_home_page_when_successfully_signup(responsive_target):

    signup_page = SignupPage(responsive_target['driver'])

    signup_page.type_text_in_input(locator='name_input', text='dummy user')
    # use fake email address to avoid duplication of existing email
    signup_page.type_text_in_input(locator='email_input', text=fake.email())
    signup_page.type_text_in_input(locator='password_input', text='dummy')
    signup_page.type_text_in_input(locator='confirm_input', text='dummy')

    signup_page.click_element('submit_btn')

    home_page = HomePage(responsive_target['driver'], independent=False)

    # if fetch and move pages, you need to wait for fetch done and next page is loaded like below otherwise, selenium can assert before target element is loaded
    home_page.wait_for_element('slogan')

    assert home_page.does_have_text_in_page('Share Your Knowledge and Expand What You Can Do')


@marks.all_ssize
@pytest.mark.submit
def test_singup_page_should_display_user_already_exist_message_when_email_already_exist(responsive_target):

    signup_page = SignupPage(responsive_target['driver'])

    signup_page.type_text_in_input(locator='name_input', text='dummy user')
    signup_page.type_text_in_input(locator='email_input', text=cfg.test_user_email)
    signup_page.type_text_in_input(locator='password_input', text='dummy')
    signup_page.type_text_in_input(locator='confirm_input', text='dummy')

    signup_page.click_element('submit_btn')

    signup_page.wait_for_element('fetch_err_msg')

    assert signup_page.does_have_text_in_page("provided email already exists.")
