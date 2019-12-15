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

    def get_title_in_header(self):
        """return title string in header logo"""
        header_logo_title = self.driver.find_element(*HeaderComponentLocators.LOGO_TITLE)
        return header_logo_title.text

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
        if locator not in self.header_element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.header_element_locators)

        target_element = self.driver.find_element(*self.header_element_locators[locator])
        return target_element.size

    def get_size_of_blogs_nav_menu_item(self):
        nav_menu_blog = self.driver.find_element(*HeaderComponentLocators.BLOGS_NAV_ITEM)
        return nav_menu_blog.size

    def is_blogs_nav_menu_item_visible(self):
        nav_menu_blog = self.driver.find_element(*HeaderComponentLocators.BLOGS_NAV_ITEM)
        return nav_menu_blog.is_displayed()
