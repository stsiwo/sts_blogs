import pytest
from selenium import webdriver
from typing import Dict
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

targetUrl = 'http://stsiwo.info'
seleniumServerUrl = 'http://127.0.0.1:4444/wd/hub'


@pytest.fixture(scope="session")
def app():
    print('setup app fixture')

    app: Dict = {
            "url": targetUrl
            }

    yield app
    print('tear down app fixture')


@pytest.fixture(scope="session")
def chrome_driver(app):
    print('setup chrome_driver fixture')
    driver = webdriver.Remote(
        command_executor=seleniumServerUrl,
        desired_capabilities=DesiredCapabilities.CHROME
        )
    driver.get(app.get('url'))
    yield driver
    print('tear down chrome_driver fixture')
