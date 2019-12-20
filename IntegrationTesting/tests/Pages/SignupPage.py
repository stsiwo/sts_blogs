from selenium.webdriver.support.ui import WebDriverWait
from tests.Pages.HeaderPage import HeaderPage
from tests.Pages.FooterPage import FooterPage
from tests.Locators.SignupPageLocators import SignupPageLocators
from selenium.common.exceptions import TimeoutException
from tests.config import signup_url
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


class SignupPage(HeaderPage, FooterPage):
    """Signup page action methods come here."""

    name = 'signup'

    element_locators = {
            }

    def __init__(self, driver, independent: bool = True):
        """
            independent param: whether driver directory load this page independently (true) or load from another page (e.g., Home Page) as dependency
        """
        super().__init__(driver)

        if independent:
            self.driver.get(signup_url)
            # need this one to avoid 'NosuchElementException'
            # - esp for when find element by link test
            # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
            delay = 3  # seconds
            try:
                myElem = WebDriverWait(self.driver, delay).until(EC.presence_of_element_located((By.ID, 'root')))
                print("Page is ready!")
            except TimeoutException:
                print("Loading took too much time!")
