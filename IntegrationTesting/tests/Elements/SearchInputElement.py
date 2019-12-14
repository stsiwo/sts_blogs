from tests.Elements.BasePageElement import BasePageElement


class SearchInputElement(BasePageElement):
    """This class gets the search text from the specified locator"""

    # The locator for search box where search string is entered
    locator = 'input[role="search-input"'
