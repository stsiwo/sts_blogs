from selenium.webdriver.common.keys import Keys


def test_chrome(chrome_driver):
    print('start test selenium')
    assert 'STS' in chrome_driver.title

    # elem = driver.find_element_by_name('p')  # Find the search box
    # elem.send_keys('seleniumhq' + Keys.RETURN)

    chrome_driver.quit()


# def test_firefox(sampleFixture):
#     print('start test selenium')
#     driver = webdriver.Remote(
#         command_executor='http://127.0.0.1:4444/wd/hub',
#         desired_capabilities=DesiredCapabilities.FIREFOX
#         )
# 
#     driver.get('http://www.yahoo.com')
#     assert 'Yahoo' in driver.title
# 
#     elem = driver.find_element_by_name('p')  # Find the search box
#     elem.send_keys('seleniumhq' + Keys.RETURN)
# 
#     driver.quit()
