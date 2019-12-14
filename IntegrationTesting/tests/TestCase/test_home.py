from tests.Pages.HomePage import HomePage


def test_search_box_in_home(target_driver):

    home_page = HomePage(target_driver)

    home_page.search_input_element = 'test'
    home_page.click_go_button()

    assert 0
