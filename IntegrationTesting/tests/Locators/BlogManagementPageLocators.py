from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator


class BlogManagementPageLocators(BaseLocator):
    """A class for main page locators. All main page locators should come here"""

    PAGE_TITLE = (By.CLASS_NAME, 'h2.page-title')

    PROFILE_LINK = (By.CSS_SELECTOR, "a[role='profile-link']")
