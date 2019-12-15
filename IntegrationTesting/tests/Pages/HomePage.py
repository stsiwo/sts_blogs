from selenium.webdriver.support.ui import WebDriverWait
from tests.Pages.BasePage import BasePage
from tests.Locators.HomePageLocators import HomePageLocators
from tests.Locators.HeaderComponentLocators import HeaderComponentLocators
from selenium.webdriver.common.keys import Keys
from tests.config import base_url
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


class HomePage(BasePage):
    """Home page action methods come here. I.e. Python.org"""

    def __init__(self, driver):
        super().__init__(driver)
        # only set base url for HomePage
        self.driver.get(base_url)
        # need this one to avoid 'NosuchElementException'
        # - esp for when find element by link test
        # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
        delay = 3  # seconds
        try:
            myElem = WebDriverWait(self.driver, delay).until(EC.presence_of_element_located((By.ID, 'root')))
            print("Page is ready!")
        except TimeoutException:
            print("Loading took too much time!")

    def get_title_in_header(self):
        """return title string in header logo"""
        header_logo_title = self.driver.find_element(*HeaderComponentLocators.LOGO_TITLE)
        return header_logo_title.text

    def get_blogs_nav_menu_item_as_text(self):
        """return blogs nav menu item title as string in header"""
        self.take_screenshot('multi')
        nav_menu_blog = self.driver.find_element(*HeaderComponentLocators.BLOGS_NAV_ITEM)
        return nav_menu_blog.text

    def get_signup_nav_menu_item_as_text(self):
        """return signup nav menu item title as string in header"""
        nav_menu_signup = self.driver.find_element(*HeaderComponentLocators.SIGNUP_NAV_ITEM)
        return nav_menu_signup.text

    def get_login_nav_menu_item_as_text(self):
        """return login nav menu item title as string in header"""
        nav_menu_login = self.driver.find_element(*HeaderComponentLocators.LOGIN_NAV_ITEM)
        return nav_menu_login.text

    def click_blogs_nav_menu_item(self):
        """click blogs nav menu item (route to BlogList Page)"""
        self.take_screenshot('blogs-nav-item')
        nav_menu_blog = self.driver.find_element(*HeaderComponentLocators.BLOGS_NAV_ITEM)
        nav_menu_blog.click()

    def click_search_icon(self):
        """Open search input element (animation)"""
        search_icon_element = self.driver.find_element(*HomePageLocators.SEARCH_BUTTON)
        search_icon_element.click()

    def click_join_btn(self):
        """click join btn (route to Signup Page)"""
        join_btn_element = self.driver.find_element(*HomePageLocators.JOIN_BUTTON)
        join_btn_element.click()

    def click_popular_btn(self):
        """click popular btn for request to get popular blogs"""
        join_btn_element = self.driver.find_element(*HomePageLocators.POPULAR_BUTTON)
        join_btn_element.click()
        WebDriverWait(self.driver, 500).until(
                lambda driver: driver.find_elements(*HomePageLocators.BLOG_TITLE)
                )

    def get_number_of_blog_item_displayed(self):
        """those blogs are fetched at initial loading (filter: 'recent')
            - the element to be found is blog title element not wrapper. this is
            to make sure all details of blog are loaded correctly
        """
        # need to wait for initial fetching
        WebDriverWait(self.driver, 500).until(
                lambda driver: driver.find_elements(*HomePageLocators.BLOG_TITLE)
                )
        blog_title_element_list = self.driver.find_elements(*HomePageLocators.BLOG_TITLE)

        return len(blog_title_element_list)

    def get_one_of_blog_title(self):
        """
            this is to make sure to fetch different blog when those btn (e.g, recent, popular) is clicked.
                - use one title before click the btn and another one to after click. then compare those to make
                sure it is different
        """
        # need to wait for initial fetching
        WebDriverWait(self.driver, 500).until(
                lambda driver: driver.find_elements(*HomePageLocators.BLOG_TITLE)
                )
        blog_title_element_list = self.driver.find_elements(*HomePageLocators.BLOG_TITLE)

        return blog_title_element_list[0].text

    def enter_text_in_search_input(self, text: str):
        """Open search input element (animation)"""
        # find search input element
        search_input_element = self.driver.find_element(*HomePageLocators.SEARCH_INPUT)
        # enter text input
        search_input_element.send_keys(text)
        # trigger move to search result page
        search_input_element.send_keys(Keys.RETURN)
