from selenium.webdriver.support.ui import WebDriverWait
from tests.Pages.Components.HeaderComponent import HeaderComponent
from tests.Pages.Components.FooterComponent import FooterComponent
from tests.Pages.Components.AsideFilterSortComponent import AsideFilterSortComponent
from tests.config import blog_management_url
from selenium.webdriver.common.by import By
from utils import wait_for_element
from tests.Locators.BlogManagementPageLocators import BlogManagementPageLocators


class BlogManagementPage(HeaderComponent, FooterComponent, AsideFilterSortComponent):
    """BlogManagement page action methods come here. I.e. Python.org"""

    name = 'blog_management'

    element_locators = {
            'page_title': BlogManagementPageLocators.PAGE_TITLE,
            'profile_link': BlogManagementPageLocators.PROFILE_LINK,
            'blog_item': BlogManagementPageLocators.BLOG_ITEM
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
                **AsideFilterSortComponent.element_locators
                }

        if independent:
            self.driver.get(blog_management_url)
            # need this one to avoid 'NosuchElementException'
            # - esp for when find element by link test
            # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
        wait_for_element(self.driver, By.ID, 'root')

    def get_number_of_blog_item_displayed(self):
        """those blogs are fetched at initial loading (filter: 'recent')
            - the element to be found is blog title element not wrapper. this is
            to make sure all details of blog are loaded correctly
        """
        # need to wait for initial fetching
        WebDriverWait(self.driver, 500).until(
                lambda driver: driver.find_elements(*self.element_locators['blog_item'])
                )
        blog_title_element_list = self.driver.find_elements(*self.element_locators['blog_item'])

        return len(blog_title_element_list)
