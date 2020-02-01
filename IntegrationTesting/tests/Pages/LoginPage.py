from selenium.webdriver.support.ui import WebDriverWait
from tests.Pages.Components.HeaderComponent import HeaderComponent
from tests.Pages.Components.FooterComponent import FooterComponent
from tests.Locators.LoginPageLocators import LoginPageLocators
from tests.config import login_url
from selenium.webdriver.common.by import By
from utils import wait_for_element
from selenium.common.exceptions import NoSuchElementException


class LoginPage(HeaderComponent, FooterComponent):
    """Home page action methods come here. I.e. Python.org"""

    name = 'login'

    element_locators = {
            'email_input': LoginPageLocators.EMAIL_INPUT,
            'email_error': LoginPageLocators.EMAIL_ERROR,
            'password_input': LoginPageLocators.PASSWORD_INPUT,
            'password_error': LoginPageLocators.PASSWORD_ERROR,
            'confirm_input': LoginPageLocators.CONFIRM_INPUT,
            'confirm_error': LoginPageLocators.CONFIRM_ERROR,
            'summary_error': LoginPageLocators.SUMMARY_ERROR,
            'submit_btn': LoginPageLocators.SUBMIT_BUTTON,
            'signup_link': LoginPageLocators.SIGNUP_LINK,
            'fetch_err_msg': LoginPageLocators.FETCH_ERR_MSG
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
            self.driver.get(login_url)
            # need this one to avoid 'NosuchElementException'
            # - esp for when find element by link test
            # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
            wait_for_element(self.driver, By.ID, 'root')

    def click_element(self, locator: str, waiting_element_locator: str = None):
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)

        target_element = self.driver.find_element(*self.element_locators[locator])
        target_element.click()
        if waiting_element_locator is not None:
            WebDriverWait(self.driver, 500).until(
                    lambda driver: driver.find_elements(*self.element_locators[waiting_element_locator])
                    )

    def type_text_in_input(self, locator: str, text: str):
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)
        target_element = self.driver.find_element(*self.element_locators[locator])
        target_element.send_keys(text)

    def does_element_exist(self, locator: str):
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)
        try:
            self.driver.find_element(*self.element_locators[locator])
        except NoSuchElementException:
            return False
        return True

    def wait_for_element(self, locator: str = None):
        if locator is None:
            print("wait for no element. you may want to specify locator as argument to wait")
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)
        if locator is not None:
            self._wait_for_element(self.element_locators[locator])
