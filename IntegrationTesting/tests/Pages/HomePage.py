from tests.Pages.BasePage import BasePage
from tests.Elements.SearchInputElement import SearchInputElement
from tests.Locators.HomePageLocators import HomePageLocators


class HomePage(BasePage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved input
    search_input_element = SearchInputElement()

    def is_title_matches(self):
        """Verifies that the hardcoded input "Python" appears in page title"""
        return "STS" in self.driver.title

    def click_go_button(self):
        """Triggers the search"""
        element = self.driver.find_element(*HomePageLocators.SEARCH_BUTTON)
        element.click()
