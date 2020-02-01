from tests.Pages.Components.HeaderComponent import HeaderComponent
from tests.Pages.Components.FooterComponent import FooterComponent
from tests.config import profile_url
from selenium.webdriver.common.by import By
from utils import wait_for_element
from tests.Locators.ProfilePageLocators import ProfilePageLocators


class ProfilePage(HeaderComponent, FooterComponent):
    """Profile page action methods come here. I.e. Python.org"""

    name = 'profile'

    element_locators = {
            'page_title': ProfilePageLocators.PAGE_TITLE,
            'user_name_input': ProfilePageLocators.USER_NAME_INPUT,
            'user_email_input': ProfilePageLocators.USER_EMAIL_INPUT,
            'user_password_input': ProfilePageLocators.USER_PASSWORD_INPUT,
            'user_confirm_input': ProfilePageLocators.USER_CONFIRM_INPUT,
            'user_avatar_image': ProfilePageLocators.USER_AVATAR_IMAGE,
            'user_avatar_image_input': ProfilePageLocators.USER_AVATAR_IMAGE_INPUT,
            'avatar_image_delete_icon': ProfilePageLocators.AVATAR_IMAGE_DELETE_ICON,
            'update_btn': ProfilePageLocators.UPDATE_BTN,
            'blog_management_link': ProfilePageLocators.BLOG_MANAGEMENT_LINK,
            'to_manage_button': ProfilePageLocators.TO_MANAGE_BUTTON
            }

    def __init__(self, driver, independent: bool = True):
        """
            independent param: whether driver directory load this page independently (true) or load from another page (e.g., Home Page) as dependency
        """
        super().__init__(driver)
        # merge all parent element locators with this element locators
        # ends up self.element_locators include all parent element locators
        self.element_locators = {
                **self.element_locators,
                **HeaderComponent.element_locators,
                **FooterComponent.element_locators,
                }

        if independent:
            self.driver.get(profile_url)
            # need this one to avoid 'NosuchElementException'
            # - esp for when find element by link test
            # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
        wait_for_element(self.driver, By.ID, 'root')
