from datetime import datetime


class BasePage(object):
    """Base class to initialize the base page that will be called from all pages"""

    def __init__(self, driver):
        self.driver = driver

    def take_screenshot(self, file_name: str = ''):
        print('start taking screen shot')
        now = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        self.driver.get_screenshot_as_file('/tmp/%s-%s.png' % (file_name, now))
