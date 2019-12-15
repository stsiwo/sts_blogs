from selenium.webdriver.common.by import By


class HeaderComponentLocators(object):
    """A class for main page locators. All main page locators should come here"""

    MENU = (By.CSS_SELECTOR, "ul[role='menu']")

    LOGO_TITLE = (By.CLASS_NAME, "header-title")

    BLOGS_NAV_ITEM = (By.LINK_TEXT, "Blogs")

    SIGNUP_NAV_ITEM = (By.LINK_TEXT, "Signup")

    LOGIN_NAV_ITEM = (By.LINK_TEXT, "Login")
