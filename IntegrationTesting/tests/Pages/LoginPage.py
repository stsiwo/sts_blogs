from tests.Pages.HeaderPage import HeaderPage
from tests.Pages.FooterPage import FooterPage
from tests.config import login_url
from selenium.webdriver.common.by import By
from utils import wait_for_element


class LoginPage(HeaderPage, FooterPage):
    """Home page action methods come here. I.e. Python.org"""

    name = 'login'

    def __init__(self, driver, independent: bool = True):
        """
            independent param: whether driver directory load this page independently (true) or load from another page (e.g., Home Page) as dependency
        """
        super().__init__(driver)

        if independent:
            print('inside independent clause')
            self.driver.get(login_url)
            # need this one to avoid 'NosuchElementException'
            # - esp for when find element by link test
            # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
            wait_for_element(self.driver, By.ID, 'root')
