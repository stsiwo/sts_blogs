from tests.Pages.HomePage import HomePage
from tests.Pages.SignupPage import SignupPage
from tests.Pages.BlogListPage import BlogListPage
from tests.Pages.LoginPage import LoginPage
import pytest
import marks
import tests.config as cfg
pytestmark = [pytest.mark.home]


# COMMON
@marks.all_ssize
def test_home_title(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    assert home_page.is_title_matches('STS')


@pytest.mark.scroll
@marks.all_ssize
def test_should_not_display_scroll_y(responsive_target):
    """
        this is to detect any overflow element and cause scroll y appears in window
            - if this test failed, it means there is some elements overflow in window
            and cause scrollable y
    """

    home_page = HomePage(responsive_target['driver'])

    assert home_page.is_scrollable_y() is not True


# HEADER
@marks.all_ssize
def test_should_display_title_in_header(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    assert home_page.get_text_of_element_in_header('logo_title') == 'STS'


@marks.desktop_ssize
def test_should_display_blogs_nav_menu_item_in_header(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    assert home_page.get_text_of_element_in_header('blogs_menu_link') == 'Blogs'
    assert 0


@marks.desktop_ssize
def test_should_display_signup_nav_menu_item_in_header(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    assert home_page.get_text_of_element_in_header('signup_menu_link') == 'Signup'


@marks.desktop_ssize
def test_should_display_login_nav_menu_item_in_header(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    assert home_page.get_text_of_element_in_header('login_menu_link') == 'Login'


@marks.desktop_ssize
def test_should_route_to_blog_list_page_when_click_blogs_link_in_header(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # click blogs nav item
    home_page.click_element_in_header('blogs_menu_link')

    # get blog_list page object with current url
    blog_list_page = BlogListPage(responsive_target['driver'])

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert blog_list_page.does_have_text_in_page('Sort by')


@marks.desktop_ssize
def test_should_route_to_signup_page_when_click_blogs_link_in_header(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # click blogs nav item
    home_page.click_element_in_header('signup_menu_link')

    # get signup page object with current url
    signup_page = SignupPage(responsive_target['driver'])

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert signup_page.does_have_text_in_page('Signup')


@marks.desktop_ssize
def test_should_route_to_login_page_when_click_blogs_link_in_header(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # click blogs nav item
    home_page.click_element_in_header('blogs_menu_link')

    # get login page object with current url
    login_page = LoginPage(responsive_target['driver'])

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert login_page.does_have_text_in_page('Login')


@marks.lte_laptop_ssize
def test_should_not_display_blogs_nav_menu_item_in_header(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # size of menu element should be 0; the element is hidden
    assert home_page.get_size_of_element_in_header('menu')['width'] == 0


@marks.lte_laptop_ssize
def test_should_display_nav_menu_toggle_icon_in_header(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # size of menu element should be 0; the element is hidden
    assert home_page.check_visibility_of_element_in_header('menu_toggle_icon')


@marks.lte_laptop_ssize
def test_should_display_nav_menu_bar_in_header_when_click_menu_toggle_icon(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # click menu toggle icon
    home_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # check menu element size (should not be 0) with animation
    assert home_page.get_size_of_element_in_header('menu')['width'] >= responsive_target['model_size']['width'] - 50


@marks.lte_laptop_ssize
def test_should_close_nav_menu_bar_in_header_when_click_menu_close_btn(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # click menu toggle icon
    home_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # click menu close icon
    home_page.click_element_in_header('menu_close_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # check menu element size (should not be 0) with animation
    assert home_page.get_size_of_element_in_header('menu')['width'] == 0


@marks.lte_laptop_ssize
def test_should_route_to_blog_list_page_when_click_blogs_link_in_header_after_open_menu_bar(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # click menu toggle icon
    home_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # click blogs nav item
    home_page.click_element_in_header('blogs_menu_link')

    # get blog_list page object with current url
    blog_list_page = BlogListPage(responsive_target['driver'])

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert blog_list_page.does_have_text_in_page('Sort by')


@marks.lte_laptop_ssize
def test_should_route_to_signup_page_when_click_blogs_link_in_header_after_open_menu_bar(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # click menu toggle icon
    home_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # click blogs nav item
    home_page.click_element_in_header('signup_menu_link')

    # get signup page object with current url
    signup_page = SignupPage(responsive_target['driver'])

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert signup_page.does_have_text_in_page('Signup')


@marks.lte_laptop_ssize
def test_should_route_to_login_page_when_click_blogs_link_in_header_after_open_menu_bar(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # click menu toggle icon
    home_page.click_element_in_header('menu_toggle_icon', waiting_element_locator=None, animation_duration_sc=cfg.animation_duration_sc)

    # click blogs nav item
    home_page.click_element_in_header('blogs_menu_link')

    # get login page object with current url
    login_page = LoginPage(responsive_target['driver'])

    # assert blog list page is correctly loaded
    # TODO: add some id text to identify 'BlogList' page
    # for now, i use 'Sort by' as id for BlogList but should be more identical one r.t. relying on the other concern
    assert login_page.does_have_text_in_page('Login')


# HOME
@marks.all_ssize
def test_should_route_search_result_page_when_search_in_home(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # open search input
    home_page.click_element('search_btn')
    # enter text in the input
    home_page.enter_text_in_search_input('test')
    # assert search result page is properly display
    # #TODO: BlogList component causes bugs so need to fix

    assert 0


@marks.all_ssize
def test_should_route_signup_page_when_join_btn_is_clicked_in_home(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # click join btn
    home_page.click_element('join_btn')
    # get signup page object with current url
    signup_page = SignupPage(responsive_target['driver'])

    # assert signup page is correctly loaded
    assert signup_page.does_have_text_in_page('Signup')


@marks.all_ssize
def test_should_display_5_blog_item_at_initial_load(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    assert 5 == home_page.get_number_of_blog_item_displayed()


@marks.all_ssize
def test_should_fetch_popular_blog_when_click_popular_btn(responsive_target):

    home_page = HomePage(responsive_target['driver'])
    # get one of blog title before click 'popular' btn
    blog_title_before_click = home_page.get_one_of_blog_title()
    # click 'popular' btn
    home_page.click_element('popular_btn', 'blog_item_title')
    # don't need to wait the blog item appears since 'click_popular_btn' does that for you
    # get one of blog title after click 'popluar' btn
    blog_title_after_click = home_page.get_one_of_blog_title()

    # #TODO: fix implementation so that 'popular' click run different query
    # after fix this, this should pass
    assert blog_title_before_click != blog_title_after_click


# FOOTER
@marks.all_ssize
def test_should_display_footer_content_of_about_me(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    assert home_page.get_text_of_element_in_footer('about_me')
