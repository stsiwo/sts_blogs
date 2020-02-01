from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator


class BlogManagementPageLocators(BaseLocator):
    """A class for main page locators. All main page locators should come here"""

    PAGE_TITLE = (By.CSS_SELECTOR, "h2[class='page-title']")

    PROFILE_LINK = (By.CSS_SELECTOR, "a[role='profile-link']")

    # be careful this is different from BLOG_ITEM from BlogList
    BLOG_ITEM = (By.CSS_SELECTOR, "div[role='blog-item']")
