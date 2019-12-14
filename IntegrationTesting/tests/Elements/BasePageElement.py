from selenium.webdriver.support.ui import WebDriverWait


class BasePageElement(object):
    """Base page class that is initialized on every page object class."""

    def __set__(self, obj, value):
        """Sets the text to the value supplied"""
        print('start setting value to Element')
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element_by_css_selector(self.locator))
        driver.find_element_by_css_selector(self.locator).clear()
        driver.find_element_by_css_selector(self.locator).send_keys(value)

    def __get__(self, obj, owner):
        """Gets the text of the specified object"""
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element_by_css_selector(self.locator))
        element = driver.find_element_by_css_selector(self.locator)
        return element.get_attribute("value")
