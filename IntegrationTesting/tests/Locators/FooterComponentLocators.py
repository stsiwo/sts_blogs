from selenium.webdriver.common.by import By


class FooterComponentLocators(object):
    """A class for main page locators. All main page locators should come here"""

    FOOTER = (By.CSS_SELECTOR, "footer")

    ABOUT_ME = (By.CSS_SELECTOR, "h2.footer-content-about-me-title")
