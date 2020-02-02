from tests.Pages.BlogManagementPage import BlogManagementPage
from tests.Pages.NewBlogPage import NewBlogPage
from tests.Pages.UpdateBlogPage import UpdateBlogPage
from selenium.webdriver.common.action_chains import ActionChains
import pytest
import marks
pytestmark = [marks.blog_management_page, pytest.mark.blog_management]

# caveats:
# - this test share the login state for this entire module, so each test function might affect each other.
#   so please keep the state original if you modify the state during a test function
# ex)
#   if you add avatar image during a test function, as cleanup, you should remove the avatar image after assertion


# BLOGLISTPAGE
@marks.all_ssize
def test_blog_management_page_should_display_blog_management_page_heading(responsive_target, login_for_blog_management):

    blog_management_page = BlogManagementPage(responsive_target['driver'], independent=False)

    # check page title does exist
    assert blog_management_page.does_have_text_in_page('Blog Management')


@marks.all_ssize
def test_blog_management_page_should_route_user_to_new_blog_page_when_click_new_blog_link(responsive_target, login_for_blog_management):

    blog_management_page = BlogManagementPage(responsive_target['driver'], independent=False)

    # sometimes, cause this error even if scroll to top
    # Element <a class="aside-new-blog-link" href="/setting/blogs/new"> is not clickable at point (308,30) because another element <header class="header-wrapper"> obscures it
    blog_management_page.scroll_to_top()

    blog_management_page.click_element('new_blog_icon')

    new_blog_page = NewBlogPage(responsive_target['driver'], independent=False)

    new_blog_page.wait_for_element('page_title')

    # check page title does exist
    assert new_blog_page.does_element_exist('page_title')

    # cleanup
    new_blog_page.click_element('blog_management_link')


@marks.all_ssize
def test_blog_management_page_should_route_user_to_update_blog_page_when_click_edit_blog_link_of_specific_blog_item(responsive_target, login_for_blog_management):

    blog_management_page = BlogManagementPage(responsive_target['driver'], independent=False)

    blog_management_page.wait_for_element('blog_item')

    blog_management_page.scroll_to_top()

    # hover (mouse enter) to one of blog items
    target_blog_item = blog_management_page.get_one_of_blog_items()
    action = ActionChains(responsive_target['driver'])
    action.move_to_element(target_blog_item).perform()

    # wait for the controller
    blog_management_page.wait_for_element('edit_blog_icon')

    # # click edit icon
    blog_management_page.click_element('edit_blog_icon')

    update_blog_page = UpdateBlogPage(responsive_target['driver'], independent=False)

    # # wait for page title of Update blog page
    update_blog_page.wait_for_element('page_title')

    # # check page title does exist
    assert update_blog_page.does_element_exist('page_title')

    # cleanup
    update_blog_page.click_element('blog_management_link')


@marks.all_ssize
def test_blog_management_page_should_delete_a_specific_blog_item_when_click_delete_button_on_the_blog_item(responsive_target, login_for_blog_management):

    blog_management_page = BlogManagementPage(responsive_target['driver'], independent=False)

    blog_management_page.wait_for_element('blog_item')

    blog_management_page.scroll_to_top()

    # hover (mouse enter) to one of blog items
    target_blog_item = blog_management_page.get_one_of_blog_items()
    action = ActionChains(responsive_target['driver'])
    action.move_to_element(target_blog_item).perform()

    # wait for the controller
    blog_management_page.wait_for_element('delete_blog_icon')

    # # click edit icon
    blog_management_page.click_element('delete_blog_icon')

    # click 'yes' on cofirm button
    confirm = blog_management_page.switch_to_confirm_dialog()
    confirm.accept()

    assert blog_management_page.does_have_text_in_page(target_blog_item.text) is not True
