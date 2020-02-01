from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator


class BlogListPageLocators(BaseLocator):
    """A class for main page locators. All main page locators should come here"""

    # By.CLASS does not work??

    PAGE_TITLE = (By.CSS_SELECTOR, "h2[class='page-title']")

    JOIN_BUTTON = (By.XPATH, "//*[contains(text(), 'Join')]")

    BLOG_ITEM = (By.CSS_SELECTOR, "a[role='blog-item']")
