from selenium.webdriver.common.by import By


class HomePageLocators(object):
    """A class for main page locators. All main page locators should come here"""
    SEARCH_BUTTON = (By.CSS_SELECTOR, "div[role='search-icon'")
