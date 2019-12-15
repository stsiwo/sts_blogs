from datetime import datetime
from selenium.webdriver.common.by import By


class BasePage(object):
    """Base class to initialize the base page that will be called from all pages"""
    root_element_locator = (By.ID, "root")

    def __init__(self, driver):
        self.driver = driver

    def is_title_matches(self, title: str):
        """Verifies that the hardcoded input "Python" appears in page title"""
        return title in self.driver.title

    def does_have_text_in_page(self, text: str):
        return text in self.driver.page_source

    def take_screenshot(self, file_name: str = ''):
        print('start taking screen shot')
        now = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        self.driver.get_screenshot_as_file('/tmp/%s-%s.png' % (file_name, now))

    def is_scrollable_y(self):
        is_scrollable_y = self.driver.execute_script("return document.getElementById('root').clientWidth < document.getElementById('root').scrollWidth")
        print(is_scrollable_y)
        return is_scrollable_y
