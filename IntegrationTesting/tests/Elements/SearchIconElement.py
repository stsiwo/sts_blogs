from tests.Elements.BasePageElement import BasePageElement


class SearchIconElement(BasePageElement):
    """This class gets the search text from the specified locator"""

    # The locator for search box where search string is entered
    locator = 'div[role="search-icon"]'
