from selenium.webdriver.support.ui import WebDriverWait
from tests.Pages.HeaderPage import HeaderPage
from tests.Pages.FooterPage import FooterPage
from tests.config import blog_management_url
from selenium.webdriver.common.by import By
from utils import wait_for_element
from tests.Locators.BlogManagementPageLocators import BlogManagementPageLocators
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime


class BlogManagementPage(HeaderPage, FooterPage):
    """BlogManagement page action methods come here. I.e. Python.org"""

    name = 'blog_management'

    element_locators = {
            'page_title': BlogManagementPageLocators.PAGE_TITLE,
            'profile_link': BlogManagementPageLocators.PROFILE_LINK
            }

    def __init__(self, driver, independent: bool = True):
        """
            independent param: whether driver directory load this page independently (true) or load from another page (e.g., Home Page) as dependency
        """
        super().__init__(driver)

        if independent:
            self.driver.get(blog_management_url)
            # need this one to avoid 'NosuchElementException'
            # - esp for when find element by link test
            # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
        wait_for_element(self.driver, By.ID, 'root')
