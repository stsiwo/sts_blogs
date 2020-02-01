from tests.Pages.LoginPage import LoginPage
from tests.Pages.HomePage import HomePage
from tests.Pages.BlogManagementPage import BlogManagementPage
import pytest
import marks
import tests.config as cfg
import itertools
from datetime import datetime
from tests.data.faker import fake
import os
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
