from tests.Pages.HomePage import HomePage
from tests.Pages.SignupPage import SignupPage
from tests.Pages.BlogListPage import BlogListPage
from tests.Pages.LoginPage import LoginPage
import pytest
import marks
pytestmark = [pytest.mark.home]


# COMMON
@marks.desktop_ssize
def test_home_title(responsive_target):

    home_page = HomePage(responsive_target['driver'])

    assert home_page.is_title_matches('STS')


