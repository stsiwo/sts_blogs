from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator


class HomePageLocators(BaseLocator):
    """A class for main page locators. All main page locators should come here"""
    SEARCH_BUTTON = (By.CSS_SELECTOR, "div[role='search-icon']")

    SEARCH_INPUT = (By.CSS_SELECTOR, "input[role='search-input']")

    JOIN_BUTTON = (By.XPATH, "//*[contains(text(), 'Join')]")

    BLOG_ITEM_TITLE = (By.CSS_SELECTOR, "h2.blog-list-item-desc-title")

    POPULAR_BUTTON = (By.XPATH, "//*[contains(text(), 'Popular')]")

    SLOGAN = (By.CSS_SELECTOR, "h1.home-slogan")
