from tests.Pages.HomePage import HomePage
from tests.Pages.SignupPage import SignupPage
from tests.Pages.BlogListPage import BlogListPage
import pytest
import marks
pytestmark = [marks.home_page, pytest.mark.home]


# HOME
@marks.all_ssize
def test_should_route_search_result_page_when_search_in_home(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    # open search input
    home_page.click_element('search_btn')
    # enter text in the input and press 'enter'
    home_page.enter_text_in_search_input('test')
    # page moves to Blog List page
    blog_list_page = BlogListPage(responsive_target['driver'])

    # assert signup page is correctly loaded
    assert blog_list_page.does_have_text_in_page('Blog List')


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
