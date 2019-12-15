from tests.Pages.BasePage import BasePage
from tests.Locators.HeaderComponentLocators import HeaderComponentLocators


class HeaderPage(BasePage):
    """Home page action methods come here. I.e. Python.org"""

    def __init__(self, driver):
        super().__init__(driver)

    def get_title_in_header(self):
        """return title string in header logo"""
        header_logo_title = self.driver.find_element(*HeaderComponentLocators.LOGO_TITLE)
        return header_logo_title.text

    def get_size_of_menu(self):
        nav_menu = self.driver.find_element(*HeaderComponentLocators.MENU)
        return nav_menu.size

    def get_blogs_nav_menu_item_as_text(self):
        """return blogs nav menu item title as string in header"""
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

    def get_size_of_blogs_nav_menu_item(self):
        nav_menu_blog = self.driver.find_element(*HeaderComponentLocators.BLOGS_NAV_ITEM)
        return nav_menu_blog.size

    def is_blogs_nav_menu_item_visible(self):
        nav_menu_blog = self.driver.find_element(*HeaderComponentLocators.BLOGS_NAV_ITEM)
        return nav_menu_blog.is_displayed()
