from tests.Pages.HomePage import HomePage
from tests.Pages.SignupPage import SignupPage
from tests.Pages.BlogListPage import BlogListPage
from tests.Pages.LoginPage import LoginPage
import pytest


def test_home_title(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)

    assert home_page.is_title_matches('STS')


def test_should_display_title_in_header(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)

    assert home_page.get_title_in_header() == 'STS'


@pytest.mark.mobile
@pytest.mark.tablet
@pytest.mark.laptop
def test_should_display_blogs_nav_menu_item_in_header(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)

    assert home_page.get_blogs_nav_menu_item_as_text() == 'Blogs'


@pytest.mark.mobile
@pytest.mark.tablet
@pytest.mark.laptop
def test_should_display_signup_nav_menu_item_in_header(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)

    assert home_page.get_signup_nav_menu_item_as_text() == 'Signup'


@pytest.mark.mobile
@pytest.mark.tablet
@pytest.mark.laptop
def test_should_display_login_nav_menu_item_in_header(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)

    assert home_page.get_login_nav_menu_item_as_text() == 'Login'


@pytest.mark.desktop
def test_should_route_to_blog_list_page_when_click_blogs_link_in_header(target_driver_with_base_url_with_desktop_ssize):

    home_page = HomePage(target_driver_with_base_url_with_desktop_ssize)

    # click blogs nav item
    home_page.click_blogs_nav_menu_item()

    # get blog_list page object with current url
    blog_list_page = BlogListPage(target_driver_with_base_url_with_desktop_ssize)

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert blog_list_page.does_have_text_in_page('Sort by')


@pytest.mark.desktop
def test_should_route_to_signup_page_when_click_blogs_link_in_header(target_driver_with_base_url_with_desktop_ssize):

    home_page = HomePage(target_driver_with_base_url_with_desktop_ssize)

    # click blogs nav item
    home_page.click_blogs_nav_menu_item()

    # get signup page object with current url
    signup_page = SignupPage(target_driver_with_base_url_with_desktop_ssize)

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert signup_page.does_have_text_in_page('Signup')


@pytest.mark.desktop
def test_should_route_to_login_page_when_click_blogs_link_in_header(target_driver_with_base_url_with_desktop_ssize):

    home_page = HomePage(target_driver_with_base_url_with_desktop_ssize)

    # click blogs nav item
    home_page.click_blogs_nav_menu_item()

    # get login page object with current url
    login_page = LoginPage(target_driver_with_base_url_with_desktop_ssize)

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert login_page.does_have_text_in_page('Login')


def test_should_route_search_result_page_when_search_in_home(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)

    # open search input
    home_page.click_search_icon()
    # enter text in the input
    home_page.enter_text_in_search_input('test')
    # assert search result page is properly display
    # #TODO: BlogList component causes bugs so need to fix

    assert 0


def test_should_route_signup_page_when_join_btn_is_clicked_in_home(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)

    # click join btn
    home_page.click_join_btn()
    # get signup page object with current url
    signup_page = SignupPage(target_driver_with_base_url)

    # assert signup page is correctly loaded
    assert signup_page.does_have_text_in_page('Signup')


def test_should_display_5_blog_item_at_initial_load(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)

    assert 5 == home_page.get_number_of_blog_item_displayed()


def test_should_fetch_popular_blog_when_click_popular_btn(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)
    # get one of blog title before click 'popular' btn
    blog_title_before_click = home_page.get_one_of_blog_title()
    # click 'popular' btn
    home_page.click_popular_btn()
    # don't need to wait the blog item appears since 'click_popular_btn' does that for you
    # get one of blog title after click 'popluar' btn
    blog_title_after_click = home_page.get_one_of_blog_title()

    # #TODO: fix implementation so that 'popular' click run different query
    # after fix this, this should pass
    assert blog_title_before_click != blog_title_after_click


def test_should_display_footer_content_of_about_me(target_driver_with_base_url):

    home_page = HomePage(target_driver_with_base_url)

    assert home_page.does_have_text_in_page('About Me')
