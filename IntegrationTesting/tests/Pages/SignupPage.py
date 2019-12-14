from selenium.webdriver.support.ui import WebDriverWait
from tests.Pages.BasePage import BasePage
from selenium.webdriver.common.keys import Keys


class SignupPage(BasePage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved input
    # search_input_element = SearchInputElement()

    def is_title_matches(self):
        """Verifies that the hardcoded input "Python" appears in page title"""
        return "STS" in self.driver.title

    def does_have_text_in_page(self, text: str):
        print(self.driver.page_source)

        return text in self.driver.page_source
