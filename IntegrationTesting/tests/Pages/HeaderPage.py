from tests.Pages.BasePage import BasePage
from tests.Locators.HeaderComponentLocators import HeaderComponentLocators


class HeaderPage(BasePage):
    """Home page action methods come here. I.e. Python.org"""

    header_element_locators = {
            'logo_title': HeaderComponentLocators.LOGO_TITLE,
            'menu': HeaderComponentLocators.MENU,
            'blogs_menu_link': HeaderComponentLocators.BLOGS_NAV_ITEM,
            'signup_menu_link': HeaderComponentLocators.SIGNUP_NAV_ITEM,
            'login_menu_link': HeaderComponentLocators.LOGIN_NAV_ITEM,
            }

    def __init__(self, driver):
        super().__init__(driver)

    def get_text_of_element_in_header(self, locator: str):
        if locator not in self.header_element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.header_element_locators)

        target_element = self.driver.find_element(*self.header_element_locators[locator])
        return target_element.text

    def click_element_in_header(self, locator: str):
        if locator not in self.header_element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.header_element_locators)

        target_element = self.driver.find_element(*self.header_element_locators[locator])
        target_element.click()

    def get_size_of_element_in_header(self, locator: str):
        """ use when want to check an element is on the document but hidden because of its size is 0 """
        if locator not in self.header_element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.header_element_locators)

        target_element = self.driver.find_element(*self.header_element_locators[locator])
        return target_element.size

    def check_visibility_of_element_in_header(self, locator: str):
        if locator not in self.header_element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.header_element_locators)
        target_element = self.driver.find_element(*self.header_element_locators[locator])
        return target_element.is_displayed()
