from tests.Pages.BasePage import BasePage


class BlogListPage(BasePage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved input
    # search_input_element = SearchInputElement()

    def does_have_text_in_page(self, text: str):
        print(self.driver.page_source)

        return text in self.driver.page_source
