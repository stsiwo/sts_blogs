from tests.Pages.BlogListPage import BlogListPage
from tests.Pages.SignupPage import SignupPage
import pytest
import marks
pytestmark = [marks.blog_list_page, pytest.mark.blog_list]


# BLOGLISTPAGE
@marks.all_ssize
def test_blog_list_page_should_display_blog_list_page_heading(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    # check page title does exist
    assert blog_list_page.does_have_text_in_page('Blog List')


@marks.all_ssize
def test_blog_list_page_should_guide_user_to_to_signup_page_after_click_join_btn(responsive_target):

    blog_list_page = BlogListPage(responsive_target['driver'])

    blog_list_page.click_element('join_button')

    # get signup page object with current url
    signup_page = SignupPage(responsive_target['driver'])

    # assert signup page is correctly loaded
    assert signup_page.does_have_text_in_page('Signup')
