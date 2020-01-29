from tests.Pages.BlogListPage import BlogListPage
from tests.Pages.SignupPage import SignupPage
import pytest
import marks
import tests.config as cfg
from tests.data.faker import fake
import itertools
from datetime import datetime
pytestmark = [marks.blog_list_page, pytest.mark.blog_list]


# BLOGLISTPAGE
@marks.all_ssize
def test_blog_list_page_should_display_blog_list_page_heading(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    # check page title does exist
    assert blog_list_page.does_have_text_in_page('Blog List')


@marks.all_ssize
def test_blog_list_page_should_display_initial_fetch_success_message_success(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    # check page title does exist
    assert blog_list_page.does_have_text_in_page('success')


@marks.lte_tablet_ssize
def test_blog_list_page_should_display_sort_and_filter_overlay_setting_when_click_setting_btn_(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('setting_icon', 'filter_sort_aside')

    # check page title does exist
    assert blog_list_page.does_have_text_in_page('Sort by')


@marks.all_ssize
def test_blog_list_page_should_display_blog_list_after_click_referesh_btn(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('refresh_icon', 'blog_item')

    # check page title does exist
    assert blog_list_page.does_element_exist('blog_item')


@marks.all_ssize
def test_blog_list_page_should_display_blog_list_after_click_limit_change_select_element(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('limit_select', 'limit_40_option')

    blog_list_page.click_element('limit_40_option', 'blog_item')

    # blog_list_page.wait_for_text("fetching ...")
    # blog_list_page.wait_for_text("success")

    # check page title does exist
    assert 40 == blog_list_page.get_number_of_blog_item_displayed()


@marks.all_ssize
def test_blog_list_page_should_display_blog_list_after_initial_fetch(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    assert 20 == blog_list_page.get_number_of_blog_item_displayed()


@marks.all_ssize
def test_blog_list_page_should_display_blog_list_after_change_different_page(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    # when use waiting_element_locator_disappear, it stuck. so use waiting_text_disappear
    # click and wait for success message to be disappear; start fetching
    blog_list_page.click_element('page_4_btn', waiting_text_disappear="success")

    # wait for new blog list is mounted
    blog_list_page.wait_for_element('blog_item')

    assert 20 == blog_list_page.get_number_of_blog_item_displayed()


@marks.all_ssize
def test_blog_list_page_should_display_blog_list_after_click_the_last_page_btn(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    # when use waiting_element_locator_disappear, it stuck. so use waiting_text_disappear
    blog_list_page.click_element('page_last_btn', waiting_text_disappear="success")

    blog_list_page.wait_for_element('blog_item')

    assert 0 < blog_list_page.get_number_of_blog_item_displayed()


@marks.all_ssize
def test_blog_list_page_should_display_blog_list_after_click_the_first_page_btn(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    initialBlogTitle: str = blog_list_page.get_text_of_element('blog_item_title')

    blog_list_page.click_element('page_last_btn', waiting_element_locator="blog_item")

    lastBlogTitle: str = blog_list_page.get_text_of_element('blog_item_title')

    blog_list_page.click_element('page_first_btn', waiting_element_locator='blog_item')

    firstBlogTitle: str = blog_list_page.get_text_of_element('blog_item_title')

    assert initialBlogTitle != lastBlogTitle
    assert initialBlogTitle == firstBlogTitle


@marks.all_ssize
def test_blog_list_page_should_guide_user_to_to_signup_page_after_click_join_btn(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('join_button')

    # get signup page object with current url
    signup_page = SignupPage(responsive_target['driver'])

    # assert signup page is correctly loaded
    assert signup_page.does_have_text_in_page('Signup')


# sort
@marks.gte_laptop_ssize
def test_blog_list_page_should_display_blog_list_sorted_by_Date_Asc(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    created_date_list = blog_list_page.get_list_of_element('blog_item_created_date')

    text_list = [datetime.strptime(element.text, '%A, %B %d, %Y') for element in created_date_list]

    for a, b in itertools.combinations(text_list, 2):
        assert a < b


@marks.gte_laptop_ssize
def test_blog_list_page_should_display_blog_list_sorted_by_Date_Desc(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('sort_date_desc_icon', waiting_element_locator='blog_item')

    created_date_list = blog_list_page.get_list_of_element('blog_item_created_date')

    text_list = [datetime.strptime(element.text, '%A, %B %d, %Y') for element in created_date_list]

    for a, b in itertools.combinations(text_list, 2):
        assert a > b


@marks.gte_laptop_ssize
def test_blog_list_page_should_display_blog_list_sorted_by_Title_Asc(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('sort_title_asc_icon', waiting_element_locator='blog_item')

    title_list = blog_list_page.get_list_of_element('blog_item_title')

    text_list = [element.text for element in title_list]

    for i in range(len(text_list) - 1):
        assert text_list[i][:1].upper() <= text_list[i+1][:1].upper()


@marks.gte_laptop_ssize
def test_blog_list_page_should_display_blog_list_sorted_by_Title_Desc(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('sort_title_desc_icon', waiting_element_locator='blog_item')

    title_list = blog_list_page.get_list_of_element('blog_item_title')

    text_list = [element.text for element in title_list]

    for i in range(len(text_list) - 1):
        assert text_list[i][:1].upper() >= text_list[i+1][:1].upper()


@marks.gte_laptop_ssize
def test_blog_list_page_should_display_blog_list_sorted_by_Clap_Asc(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('sort_clap_asc_icon', waiting_element_locator='blog_item')

    clap_list = blog_list_page.get_list_of_element('blog_item_clap')

    text_list = [int(s) for element in clap_list for s in element.text.split() if s.isdigit()]

    for i in range(len(text_list) - 1):
        assert text_list[i] <= text_list[i+1]


@marks.gte_laptop_ssize
def test_blog_list_page_should_display_blog_list_sorted_by_Clap_Desc(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('sort_clap_desc_icon', waiting_element_locator='blog_item')

    clap_list = blog_list_page.get_list_of_element('blog_item_clap')

    text_list = [int(s) for element in clap_list for s in element.text.split() if s.isdigit()]

    for i in range(len(text_list) - 1):
        assert text_list[i] >= text_list[i+1]


@marks.gte_laptop_ssize
@pytest.mark.ppp
def test_blog_list_page_should_display_blog_list_after_keyword_filter_change(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('sort_clap_desc_icon', waiting_element_locator='blog_item')

    clap_list = blog_list_page.get_list_of_element('blog_item_clap')

    text_list = [int(s) for element in clap_list for s in element.text.split() if s.isdigit()]

    for i in range(len(text_list) - 1):
        assert text_list[i] >= text_list[i+1]
