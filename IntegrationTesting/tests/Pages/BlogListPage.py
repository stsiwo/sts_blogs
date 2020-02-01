from selenium.webdriver.support.ui import WebDriverWait
from tests.Pages.Components.HeaderComponent import HeaderComponent
from tests.Pages.Components.FooterComponent import FooterComponent
from tests.Pages.Components.AsideFilterSortComponent import AsideFilterSortComponent
from tests.config import blog_list_url
from selenium.webdriver.common.by import By
from utils import wait_for_element
from tests.Locators.BlogListPageLocators import BlogListPageLocators


class BlogListPage(HeaderComponent, FooterComponent, AsideFilterSortComponent):
    """BlogList page action methods come here. I.e. Python.org"""

    name = 'blog_list'

    element_locators = {
            'page_title': BlogListPageLocators.PAGE_TITLE,
            'setting_icon': BlogListPageLocators.SETTING_ICON,
            'refresh_icon': BlogListPageLocators.REFRESH_ICON,
            'blog_item': BlogListPageLocators.BLOG_ITEM,
            'limit_select': BlogListPageLocators.LIMIT_SELECT,
            'limit_40_option': BlogListPageLocators.LIMIT_40_OPTION,
            'fetch_status_title': BlogListPageLocators.FETCH_STATUS_TITLE,
            'page_4_btn': BlogListPageLocators.PAGE_4_BTN,
            'page_first_btn': BlogListPageLocators.PAGE_FIRST_BTN,
            'page_last_btn': BlogListPageLocators.PAGE_LAST_BTN,
            'blog_list_fetching': BlogListPageLocators.BLOG_LIST_FETCHING,
            'blog_item_title': BlogListPageLocators.BLOG_ITEM_TITLE,
            'blog_item_created_date': BlogListPageLocators.BLOG_ITEM_CREATED_DATE,
            'blog_item_clap': BlogListPageLocators.BLOG_ITEM_CLAP,
            'blog_item_tag': BlogListPageLocators.BLOG_ITEM_TAG,
            'join_button': BlogListPageLocators.JOIN_BUTTON,
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
            self.driver.get(blog_list_url)
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
                lambda driver: driver.find_elements(*BlogListPageLocators.BLOG_ITEM)
                )
        blog_title_element_list = self.driver.find_elements(*BlogListPageLocators.BLOG_ITEM)

        return len(blog_title_element_list)
