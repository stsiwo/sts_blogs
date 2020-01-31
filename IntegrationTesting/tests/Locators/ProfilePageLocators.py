from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator


class ProfilePageLocators(BaseLocator):
    """A class for main page locators. All main page locators should come here"""

    # By.CLASS_NAME behave wierdly

    PAGE_TITLE = (By.CSS_SELECTOR, "h2[class='page-title']")

    USER_NAME_INPUT = (By.CSS_SELECTOR, "input[id='name']")

    USER_EMAIL_INPUT = (By.CSS_SELECTOR, "input[id='email']")

    USER_PASSWORD_INPUT = (By.CSS_SELECTOR, "input[id='password']")

    USER_CONFIRM_INPUT = (By.CSS_SELECTOR, "input[id='confirm']")

    USER_AVATAR_IMAGE = (By.CSS_SELECTOR, "img[class='profile-picture-img']")

    USER_AVATAR_IMAGE_INPUT = (By.CSS_SELECTOR, "input[id='profile-picture-input']")

    AVATAR_IMAGE_DELETE_ICON = (By.CSS_SELECTOR, "div[role='avatar-delete-icon']")

    UPDATE_BTN = (By.CSS_SELECTOR, "button[role='update-btn']")

    BLOG_MANAGEMENT_LINK = (By.LINK_TEXT, "Blog Management")

    TO_MANAGE_BUTTON = (By.XPATH, "//button[contains(text(), 'To Manage')]")
