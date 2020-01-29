from selenium.webdriver.support.ui import WebDriverWait
from tests.Pages.HeaderPage import HeaderPage
from tests.Pages.FooterPage import FooterPage
from tests.config import blog_list_url
from selenium.webdriver.common.by import By
from utils import wait_for_element
from tests.Locators.BlogListPageLocators import BlogListPageLocators
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime


class BlogListPage(HeaderPage, FooterPage):
    """BlogList page action methods come here. I.e. Python.org"""

    name = 'blog_list'

    element_locators = {
            'page_title': BlogListPageLocators.PAGE_TITLE,
            'setting_icon': BlogListPageLocators.SETTING_ICON,
            'filter_sort_aside': BlogListPageLocators.FILTER_SORT_ASIDE,
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
            'join_button': BlogListPageLocators.JOIN_BUTTON,
            'sort_date_asc_icon': BlogListPageLocators.SORT_DATE_ASC_ICON,
            'sort_date_desc_icon': BlogListPageLocators.SORT_DATE_DESC_ICON,
            'sort_title_asc_icon': BlogListPageLocators.SORT_TITLE_ASC_ICON,
            'sort_title_desc_icon': BlogListPageLocators.SORT_TITLE_DESC_ICON,
            'sort_clap_asc_icon': BlogListPageLocators.SORT_CLAP_ASC_ICON,
            'sort_clap_desc_icon': BlogListPageLocators.SORT_CLAP_DESC_ICON
            }

    def __init__(self, driver, independent: bool = True):
        """
            independent param: whether driver directory load this page independently (true) or load from another page (e.g., Home Page) as dependency
        """
        super().__init__(driver)

        if independent:
            self.driver.get(blog_list_url)
            # need this one to avoid 'NosuchElementException'
            # - esp for when find element by link test
            # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
        wait_for_element(self.driver, By.ID, 'root')

    def does_element_exist(self, locator: str):
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)
        try:
            print(*self.element_locators[locator])
            self.driver.find_element(*self.element_locators[locator])
        except NoSuchElementException:
            return False
        return True

    def click_element(self, locator: str, waiting_element_locator: str = None, waiting_text: str = '', waiting_element_locator_disappear: str = None, waiting_text_disappear: str = ''):
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)

        target_element = self.driver.find_element(*self.element_locators[locator])
        target_element.click()
        if waiting_element_locator is not None:
            WebDriverWait(self.driver, 500).until(
                    lambda driver: driver.find_elements(*self.element_locators[waiting_element_locator])
                    )
        if waiting_text is not '':
            self.wait_for_text(waiting_text)
        if waiting_element_locator_disappear is not None:
            WebDriverWait(self.driver, 500).until_not(
                    lambda driver: EC.presence_of_element_located(self.element_locators[waiting_element_locator_disappear])
                    )
        if waiting_text_disappear is not '':
            self.wait_for_text_disappear(waiting_text_disappear)

    def wait_for_element(self, locator: str = None):
        if locator is None:
            print("wait for no element. you may want to specify locator as argument to wait")
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)
        if locator is not None:
            self._wait_for_element(self.element_locators[locator])

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

    def get_text_of_element(self, locator: str = None):
        return self.driver.find_element(*self.element_locators[locator]).text

    def get_list_of_element(self, locator: str = None):
        # need to wait for initial fetching
        WebDriverWait(self.driver, 500).until(
                lambda driver: driver.find_elements(*self.element_locators[locator])
                )
        elements = self.driver.find_elements(*self.element_locators[locator])
        return elements 
