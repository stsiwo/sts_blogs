from tests.Pages.BasePage import BasePage
from tests.Locators.FooterComponentLocators import FooterComponentLocators


class FooterPage(BasePage):
    """Home page action methods come here. I.e. Python.org"""

    footer_element_locators = {
            'footer': FooterComponentLocators.FOOTER,
            'about_me': FooterComponentLocators.ABOUT_ME,
            }

    def __init__(self, driver):
        super().__init__(driver)

    def get_text_of_element_in_footer(self, locator: str):
        if locator not in self.footer_element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.footer_element_locators)

        target_element = self.driver.find_element(*self.footer_element_locators[locator])
        return target_element.text

    def click_element_in_footer(self, locator: str):
        if locator not in self.footer_element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.footer_element_locators)

        target_element = self.driver.find_element(*self.footer_element_locators[locator])
        target_element.click()

    def get_size_of_element_in_footer(self, locator: str):
        """ use when want to check an element is on the document but hidden because of its size is 0 """
        if locator not in self.footer_element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.footer_element_locators)

        target_element = self.driver.find_element(*self.footer_element_locators[locator])
        return target_element.size

    def check_visibility_of_element_in_footer(self, locator: str):
        if locator not in self.footer_element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.footer_element_locators)
        target_element = self.driver.find_element(*self.footer_element_locators[locator])
        return target_element.is_displayed()
