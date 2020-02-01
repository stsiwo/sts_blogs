from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator


class AsideFilterSortComponentLocators(BaseLocator):
    """A class for main page locators. All main page locators should come here"""

    FILTER_SORT_ASIDE = (By.CSS_SELECTOR, "aside[role='filter-sort-aside']")

    SORT_DATE_ASC_ICON = (By.CSS_SELECTOR, "label[for='sort-0']")

    SORT_DATE_DESC_ICON = (By.CSS_SELECTOR, "label[for='sort-1']")

    SORT_TITLE_ASC_ICON = (By.CSS_SELECTOR, "label[for='sort-2']")

    SORT_TITLE_DESC_ICON = (By.CSS_SELECTOR, "label[for='sort-3']")

    SORT_CLAP_ASC_ICON = (By.CSS_SELECTOR, "label[for='sort-4']")

    SORT_CLAP_DESC_ICON = (By.CSS_SELECTOR, "label[for='sort-5']")

    FILTER_KEYWORD_INPUT = (By.CSS_SELECTOR, "input[id='keyword']")

    FILTER_START_DATE_INPUT = (By.CSS_SELECTOR, "input[id='start-date-input']")

    FILTER_END_DATE_INPUT = (By.CSS_SELECTOR, "input[id='end-date-input']")

    FILTER_TAG_INPUT = (By.CSS_SELECTOR, "input[id='tag']")
