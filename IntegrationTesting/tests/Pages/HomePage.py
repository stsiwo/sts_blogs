from selenium.webdriver.support.ui import WebDriverWait
from tests.Pages.HeaderPage import HeaderPage
from tests.Pages.FooterPage import FooterPage
from tests.Locators.HomePageLocators import HomePageLocators
from selenium.webdriver.common.keys import Keys
from tests.config import base_url
from selenium.webdriver.common.by import By
from utils import wait_for_element


class HomePage(HeaderPage, FooterPage):
    """Home page action methods come here. I.e. Python.org"""

    name = 'home'

    element_locators = {
            'search_btn': HomePageLocators.SEARCH_BUTTON,
            'search_input': HomePageLocators.SEARCH_INPUT,
            'join_btn': HomePageLocators.JOIN_BUTTON,
            'blog_item_title': HomePageLocators.BLOG_ITEM_TITLE,
            'popular_btn': HomePageLocators.POPULAR_BUTTON,
            }

    def __init__(self, driver, independent: bool = True):
        super().__init__(driver)
        if independent:
            self.driver.get(base_url)
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

    def get_number_of_blog_item_displayed(self):
        """those blogs are fetched at initial loading (filter: 'recent')
            - the element to be found is blog title element not wrapper. this is
            to make sure all details of blog are loaded correctly
        """
        # need to wait for initial fetching
        WebDriverWait(self.driver, 500).until(
                lambda driver: driver.find_elements(*HomePageLocators.BLOG_ITEM_TITLE)
                )
        blog_title_element_list = self.driver.find_elements(*HomePageLocators.BLOG_ITEM_TITLE)

        return len(blog_title_element_list)

    def get_one_of_blog_title(self):
        """
            this is to make sure to fetch different blog when those btn (e.g, recent, popular) is clicked.
                - use one title before click the btn and another one to after click. then compare those to make
                sure it is different
        """
        # need to wait for initial fetching
        WebDriverWait(self.driver, 500).until(
                lambda driver: driver.find_elements(*HomePageLocators.BLOG_ITEM_TITLE)
                )
        blog_title_element_list = self.driver.find_elements(*HomePageLocators.BLOG_ITEM_TITLE)

        return blog_title_element_list[0].text

    def enter_text_in_search_input(self, text: str):
        """Open search input element (animation)"""
        # find search input element
        search_input_element = self.driver.find_element(*HomePageLocators.SEARCH_INPUT)
        # enter text input
        search_input_element.send_keys(text)
        # trigger move to search result page
        search_input_element.send_keys(Keys.RETURN)
