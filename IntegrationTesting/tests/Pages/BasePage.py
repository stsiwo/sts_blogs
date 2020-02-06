from datetime import datetime
from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import tests.config as cfg
import time


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

    def scroll_to_top(self):
        self.driver.find_element_by_tag_name('body').send_keys(Keys.HOME)

    def scroll_to_bottom(self):
        self.driver.find_element_by_tag_name('body').send_keys(Keys.END)

    def switch_to_confirm_dialog(self):
        return self.driver.switch_to.alert

    def wait_for_animation_finish(self):
        time.sleep(cfg.animation_duration_sc)  # works!! use this for wait animation done

    def wait_for_element(self, locator: str = None):
        if locator is None:
            print("wait for no element. you may want to specify locator as argument to wait")
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)
        if locator is not None:
            WebDriverWait(self.driver, 500).until(
                    lambda driver: driver.find_elements(*self.element_locators[locator])
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

    def enter_text_in_element_and_click(self, text: str = '', locator: str = None):
        """Open search input element (animation)"""
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)
        # find input element
        element = self.driver.find_element(*self.element_locators[locator])
        # enter text input
        element.send_keys(text)
        # press 'Enter'
        element.send_keys(Keys.RETURN)

    def enter_text_in_element(self, text: str = '', locator: str = None, clear: bool = False):
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)
        # find input element
        element = self.driver.find_element(*self.element_locators[locator])

        # clear if specified
        if clear:
            # clear() does not work
            element.send_keys(Keys.CONTROL + "a")
            element.send_keys(Keys.DELETE)
        # enter text input
        element.send_keys(text)

    def get_list_of_element(self, locator: str = None):
        # need to wait for initial fetching
        WebDriverWait(self.driver, 500).until(
                lambda driver: driver.find_elements(*self.element_locators[locator])
                )
        elements = self.driver.find_elements(*self.element_locators[locator])
        return elements

    def get_text_of_element(self, locator: str = None):
        return self.driver.find_element(*self.element_locators[locator]).text

    def get_value_of_element(self, locator: str = None):
        return self.driver.find_element(*self.element_locators[locator]).get_attribute("value")

    def get_attribute_of_element(self, locator: str = None, attribute: str = None):
        return self.driver.find_element(*self.element_locators[locator]).get_attribute(attribute)

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

    def does_element_exist(self, locator: str):
        if locator not in self.element_locators:
            raise Exception('locator you provide is not available. available locators: %s' % self.element_locators)
        try:
            print(*self.element_locators[locator])
            self.driver.find_element(*self.element_locators[locator])
        except NoSuchElementException:
            return False
        return True
