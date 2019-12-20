from tests.Pages.SignupPage import SignupPage
from tests.Pages.BlogListPage import BlogListPage
from tests.Pages.LoginPage import LoginPage
import pytest
import marks
import tests.config as cfg
pytestmark = [pytest.mark.header]


# HEADER
@marks.all_ssize
@marks.all_page
def test_should_display_title_in_header(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    assert target_page.get_text_of_element_in_header('logo_title') == 'STS'


@marks.desktop_ssize
@marks.all_page
def test_should_display_blogs_nav_menu_item_in_header(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    assert target_page.get_text_of_element_in_header('blogs_menu_link') == 'Blogs'


@marks.desktop_ssize
@marks.all_page
def test_should_display_signup_nav_menu_item_in_header(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    assert target_page.get_text_of_element_in_header('signup_menu_link') == 'Signup'


@marks.desktop_ssize
@marks.all_page
def test_should_display_login_nav_menu_item_in_header(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    assert target_page.get_text_of_element_in_header('login_menu_link') == 'Login'


@marks.desktop_ssize
@marks.all_page
def test_should_route_to_blog_list_page_when_click_blogs_link_in_header(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # click blogs nav item
    target_page.click_element_in_header('blogs_menu_link')

    # get blog_list page object with current url
    blog_list_page = BlogListPage(responsive_target['driver'], independent=False)

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    # TODO: fix error when loading this page
    assert blog_list_page.does_have_text_in_page('Sort by')


@marks.desktop_ssize
@marks.all_page
def test_should_route_to_signup_page_when_click_blogs_link_in_header(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # click blogs nav item
    target_page.click_element_in_header('signup_menu_link')

    # get signup page object with current url
    signup_page = SignupPage(responsive_target['driver'], independent=False)

    # assert blog list page is correctly loaded
    assert signup_page.does_have_text_in_page('Signup')


@marks.desktop_ssize
@marks.all_page
def test_should_route_to_login_page_when_click_blogs_link_in_header(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # click blogs nav item
    target_page.click_element_in_header('login_menu_link')

    # get login page object with current url
    login_page = LoginPage(responsive_target['driver'], independent=False)

    # assert blog list page is correctly loaded
    assert login_page.does_have_text_in_page('Login')


@marks.lte_laptop_ssize
@marks.all_page
def test_should_not_display_blogs_nav_menu_item_in_header(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # size of menu element should be 0; the element is hidden
    assert target_page.get_size_of_element_in_header('menu')['width'] == 0


@marks.lte_laptop_ssize
@marks.all_page
def test_should_display_nav_menu_toggle_icon_in_header(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # size of menu element should be 0; the element is hidden
    assert target_page.check_visibility_of_element_in_header('menu_toggle_icon')


@marks.lte_laptop_ssize
@marks.all_page
def test_should_display_nav_menu_bar_in_header_when_click_menu_toggle_icon(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # click menu toggle icon
    target_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # check menu element size (should not be 0) with animation
    assert target_page.get_size_of_element_in_header('menu')['width'] >= responsive_target['model_size']['width'] - 50


@marks.lte_laptop_ssize
@marks.all_page
def test_should_close_nav_menu_bar_in_header_when_click_menu_close_btn(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # click menu toggle icon
    target_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # click menu close icon
    target_page.click_element_in_header('menu_close_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # check menu element size (should not be 0) with animation
    # TODO: because of css debugger, it cause extra with (2px)
    # - can leave this failed for testing env (enabled css debugger)
    # - it should pass in staging env
    assert target_page.get_size_of_element_in_header('menu')['width'] == 0


@marks.lte_laptop_ssize
@marks.all_page
def test_should_route_to_blog_list_page_when_click_blogs_link_in_header_after_open_menu_bar(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # click menu toggle icon
    target_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # click blogs nav item
    target_page.click_element_in_header('blogs_menu_link')

    # get blog_list page object with current url
    blog_list_page = BlogListPage(responsive_target['driver'], independent=False)

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert blog_list_page.does_have_text_in_page('Sort by')


@marks.lte_laptop_ssize
@marks.all_page
def test_should_route_to_signup_page_when_click_blogs_link_in_header_after_open_menu_bar(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # click menu toggle icon
    target_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # click blogs nav item
    target_page.click_element_in_header('signup_menu_link')

    # get signup page object with current url
    signup_page = SignupPage(responsive_target['driver'], independent=False)

    # assert blog list page is correctly loaded
    assert signup_page.does_have_text_in_page('Signup')


@marks.lte_laptop_ssize
@marks.all_page
def test_should_route_to_login_page_when_click_blogs_link_in_header_after_open_menu_bar(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    # click menu toggle icon
    target_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # click blogs nav item
    target_page.click_element_in_header('blogs_menu_link')

    # get login page object with current url
    login_page = LoginPage(responsive_target['driver'], independent=False)

    # assert blog list page is correctly loaded
    assert login_page.does_have_text_in_page('Login')
