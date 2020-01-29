from datetime import datetime
from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator
from selenium.webdriver.support.ui import WebDriverWait


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
        # clientWidth = self.driver.execute_script("return document.getElementById('root').clientWidth")
        # scrollWidth = self.driver.execute_script("return document.getElementById('root').scrollWidth")
        # print('clientWidth: {}'.format(clientWidth))
        # print('scrollWidth: {}'.format(scrollWidth))
        # NOTE: even if there is no scrollbar, there is a little gap between client and scroll width (maybe because of css for debugging; 1px border for every element)
        #  - so if the gap is less than 16px (size of scroll bar), there is no overflowing element.
        is_scrollable_y = self.driver.execute_script("return (document.getElementById('root').scrollWidth - document.getElementById('root').clientWidth) > 16")

        return is_scrollable_y

    def _wait_for_element(self, locator: BaseLocator):
        WebDriverWait(self.driver, 1000).until(
                lambda driver: driver.find_elements(*locator)
                )

    def wait_for_text(self, text: str = ''):
        if text is None:
            print("wait for no element. you may want to specify text as argument to wait")
        if text is not None:
            WebDriverWait(self.driver, 1000).until(
                lambda driver: text in self.driver.page_source
                )

    def wait_for_text_disappear(self, text: str = ''):
        if text is None:
            print("wait for no element to be disappeared. you may want to specify text as argument to wait")
        if text is not None:
            WebDriverWait(self.driver, 1000).until_not(
                lambda driver: text in self.driver.page_source
                )
