from selenium.webdriver.common.by import By


class LoginPageLocators(object):
    """A class for main page locators. All main page locators should come here"""

    EMAIL_INPUT = (By.ID, "email")

    EMAIL_ERROR = (By.CLASS_NAME, 'div.email-error')

    PASSWORD_INPUT = (By.ID, "password")

    PASSWORD_ERROR = (By.CLASS_NAME, 'div.password-error')

    CONFIRM_INPUT = (By.ID, "confirm")

    CONFIRM_ERROR = (By.CLASS_NAME, 'div.confirm-error')

    SUMMARY_ERROR = (By.CLASS_NAME, 'div.summary-error')

    SUBMIT_BUTTON = (By.CSS_SELECTOR, 'input[role="login-btn"]')

    SIGNUP_LINK = (By.LINK_TEXT, 'Signup Page')

    FETCH_ERR_MSG = (By.CSS_SELECTOR, 'p.fetch-status-err-msg')
