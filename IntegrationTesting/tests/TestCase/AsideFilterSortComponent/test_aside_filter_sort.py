import marks
import pytest
from datetime import datetime
import tests.config as cfg
import itertools
pytestmark = [pytest.mark.aside_filter_sort, marks.blog_filter_sort_component]


@marks.all_ssize
def test_target_page_should_display_target_page_heading(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    # check page title does exist
    assert target_page.does_element_exist('page_title')


@marks.all_ssize
def test_target_page_should_display_initial_fetch_success_message_success(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    # check page title does exist
    assert target_page.does_have_text_in_page('success')


@marks.lte_tablet_ssize
def test_target_page_should_display_sort_and_filter_overlay_setting_when_click_setting_btn_(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    target_page.click_element('setting_icon', 'filter_sort_aside')

    # check page title does exist
    assert target_page.does_have_text_in_page('Sort by')


@marks.all_ssize
def test_target_page_should_display_blog_list_after_click_referesh_btn(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    target_page.click_element('refresh_icon', 'blog_item')

    # check page title does exist
    assert target_page.does_element_exist('blog_item')


@marks.all_ssize
def test_target_page_should_display_blog_list_after_click_limit_change_select_element(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    target_page.click_element('limit_select', 'limit_40_option')

    target_page.click_element('limit_40_option', 'blog_item')

    # check page title does exist
    assert 40 == target_page.get_number_of_blog_item_displayed()


@marks.all_ssize
def test_target_page_should_display_blog_list_after_initial_fetch(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    assert 20 == target_page.get_number_of_blog_item_displayed()


@marks.all_ssize
def test_target_page_should_display_blog_list_after_change_different_page(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    initialBlogTitle: str = target_page.get_text_of_element('blog_item_title')
    # when use waiting_element_locator_disappear, it stuck. so use waiting_text_disappear
    # click and wait for success message to be disappear; start fetching
    target_page.click_element('page_4_btn')

    # wait for new blog list is mounted
    target_page.wait_for_element('blog_item')

    lastBlogTitle: str = target_page.get_text_of_element('blog_item_title')

    assert initialBlogTitle != lastBlogTitle


@marks.all_ssize
def test_target_page_should_display_blog_list_after_click_the_last_page_btn(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    initialBlogTitle: str = target_page.get_text_of_element('blog_item_title')

    target_page.click_element('page_last_btn')

    target_page.wait_for_element('blog_item')

    lastBlogTitle: str = target_page.get_text_of_element('blog_item_title')

    assert initialBlogTitle != lastBlogTitle


# current best way to check whether fetch has done successfully is to depends on displayed text on blog item
# since old blog item (before fetch) and new blog item (after fetch) must have different text
#  - if depends on fetch status message, it ends up trouble (e.g., front end caching prevent from fetching)
#    - requesting data which is previsouly done does not happen because of cache
#  - if depends on blog item element appear/disappear, it also ends up trouble (e.g., react reconciliation might update/unmount/mount element based on its rules)
#    - react might only update element; this never cause element disappeared
@marks.all_ssize
def test_target_page_should_display_blog_list_after_click_the_first_page_btn(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    initialBlogTitle: str = target_page.get_text_of_element('blog_item_title')

    target_page.click_element('page_last_btn', waiting_element_locator="blog_item")

    lastBlogTitle: str = target_page.get_text_of_element('blog_item_title')

    target_page.click_element('page_first_btn', waiting_element_locator='blog_item')

    firstBlogTitle: str = target_page.get_text_of_element('blog_item_title')

    assert initialBlogTitle != lastBlogTitle
    assert initialBlogTitle == firstBlogTitle


# sort
@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_sorted_by_Date_Asc(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    created_date_list = target_page.get_list_of_element('blog_item_created_date')

    text_list = [datetime.strptime(element.text, '%A, %B %d, %Y') for element in created_date_list]

    for a, b in itertools.combinations(text_list, 2):
        assert a <= b


@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_sorted_by_Date_Desc(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    target_page.click_element('sort_date_desc_icon', waiting_element_locator='blog_item')

    created_date_list = target_page.get_list_of_element('blog_item_created_date')

    text_list = [datetime.strptime(element.text, '%A, %B %d, %Y') for element in created_date_list]

    for a, b in itertools.combinations(text_list, 2):
        assert a >= b


@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_sorted_by_Title_Asc(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    target_page.click_element('sort_title_asc_icon', waiting_element_locator='blog_item')

    title_list = target_page.get_list_of_element('blog_item_title')

    text_list = [element.text for element in title_list]

    for i in range(len(text_list) - 1):
        assert text_list[i][:1].upper() <= text_list[i+1][:1].upper()


@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_sorted_by_Title_Desc(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    target_page.click_element('sort_title_desc_icon', waiting_element_locator='blog_item')

    title_list = target_page.get_list_of_element('blog_item_title')

    text_list = [element.text for element in title_list]

    for i in range(len(text_list) - 1):
        assert text_list[i][:1].upper() >= text_list[i+1][:1].upper()


@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_sorted_by_Clap_Asc(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    target_page.click_element('sort_clap_asc_icon', waiting_element_locator='blog_item')

    clap_list = target_page.get_list_of_element('blog_item_clap')

    text_list = [int(s) for element in clap_list for s in element.text.split() if s.isdigit()]

    for i in range(len(text_list) - 1):
        assert text_list[i] <= text_list[i+1]


@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_sorted_by_Clap_Desc(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    target_page.click_element('sort_clap_desc_icon', waiting_element_locator='blog_item')

    clap_list = target_page.get_list_of_element('blog_item_clap')

    text_list = [int(s) for element in clap_list for s in element.text.split() if s.isdigit()]

    for i in range(len(text_list) - 1):
        assert text_list[i] >= text_list[i+1]


@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_after_keyword_filter_change(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    target_page.enter_text_in_element_and_click('keyword', 'filter_keyword_input')

    target_page.wait_for_element('blog_item')

    filtered_elements = target_page.get_list_of_element('blog_item_title')

    text_list = [element.text for element in filtered_elements]

    for text in text_list:
        assert cfg.test_blog_item_keyword in text


@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_after_start_date_filter_change(responsive_target, TargetPage, login_if_necessary_for_component):

    test_date_string = '01/01/2049'
    test_datetime = datetime.strptime(test_date_string, '%m/%d/%Y')

    target_page = TargetPage(responsive_target['driver'])

    target_page.enter_text_in_element_and_click(test_date_string, 'filter_start_date_input')

    target_page.wait_for_element('blog_item')

    filtered_elements = target_page.get_list_of_element('blog_item_created_date')

    text_list = [datetime.strptime(element.text, '%A, %B %d, %Y') for element in filtered_elements]

    for date in text_list:
        assert test_datetime <= date


@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_after_end_date_filter_change(responsive_target, TargetPage, login_if_necessary_for_component):

    test_date_string = '01/01/1951'
    test_datetime = datetime.strptime(test_date_string, '%m/%d/%Y')

    target_page = TargetPage(responsive_target['driver'])

    target_page.enter_text_in_element_and_click(test_date_string, 'filter_end_date_input')

    target_page.wait_for_element('blog_item')

    filtered_elements = target_page.get_list_of_element('blog_item_created_date')

    text_list = [datetime.strptime(element.text, '%A, %B %d, %Y') for element in filtered_elements]

    for date in text_list:
        assert test_datetime >= date


@marks.gte_laptop_ssize
def test_target_page_should_display_blog_list_after_tag_filter_change(responsive_target, TargetPage, login_if_necessary_for_component):

    target_page = TargetPage(responsive_target['driver'])

    # input tag 'js' to tag input in filter
    target_page.enter_text_in_element_and_click(cfg.test_blog_item_tag, 'filter_tag_input')

    # wait for blog list is displayed after fetch
    target_page.wait_for_element('blog_item')

    # get list of tag element in blog item
    filtered_elements = target_page.get_list_of_element('blog_item_tag')

    # extract text from the element into array
    text_list = [element.text for element in filtered_elements]

    # check dummy tag exists in each of the list
    for tag_text in text_list:
        assert cfg.test_blog_item_tag in tag_text
