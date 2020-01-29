from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator


class BlogListPageLocators(BaseLocator):
    """A class for main page locators. All main page locators should come here"""

    PAGE_TITLE = (By.CLASS_NAME, 'h2.page-title')

    SETTING_ICON = (By.CSS_SELECTOR, "div[role='setting-icon']")

    FILTER_SORT_ASIDE = (By.CSS_SELECTOR, "aside[role='filter-sort-aside']")

    REFRESH_ICON = (By.CSS_SELECTOR, "div[role='refresh-icon']")

    BLOG_ITEM = (By.CSS_SELECTOR, "a[role='blog-item']")

    LIMIT_SELECT = (By.CSS_SELECTOR, "select[role='page-limit-select']")

    LIMIT_40_OPTION = (By.CSS_SELECTOR, "option[value='40']")

    FETCH_STATUS_TITLE = (By.CLASS_NAME, 'h3.fetch-status-title')

    PAGE_4_BTN = (By.CSS_SELECTOR, "button[role='page-btn-4']")

    PAGE_FIRST_BTN = (By.CSS_SELECTOR, "button[role='first-page-btn']")

    PAGE_LAST_BTN = (By.CSS_SELECTOR, "button[role='last-page-btn']")

    BLOG_LIST_FETCHING = (By.CSS_SELECTOR, "p[role='fetching']")

    BLOG_ITEM_TITLE = (By.CSS_SELECTOR, "h2.blog-list-item-desc-title")

    BLOG_ITEM_CREATED_DATE = (By.CSS_SELECTOR, "p.blog-list-item-desc-detail-date")

    BLOG_ITEM_CLAP = (By.CSS_SELECTOR, "p.blog-list-item-desc-detail-clap")

    JOIN_BUTTON = (By.XPATH, "//*[contains(text(), 'Join')]")

    SORT_DATE_ASC_ICON = (By.CSS_SELECTOR, "label[for='sort-0']")

    SORT_DATE_DESC_ICON = (By.CSS_SELECTOR, "label[for='sort-1']")

    SORT_TITLE_ASC_ICON = (By.CSS_SELECTOR, "label[for='sort-2']")

    SORT_TITLE_DESC_ICON = (By.CSS_SELECTOR, "label[for='sort-3']")

    SORT_CLAP_ASC_ICON = (By.CSS_SELECTOR, "label[for='sort-4']")

    SORT_CLAP_DESC_ICON = (By.CSS_SELECTOR, "label[for='sort-5']")

    FILTER_KEYWORD_ICON = (By.CSS_SELECTOR, "label[for='keyword']")

    FILTER_START_DATE_ICON = (By.CSS_SELECTOR, "label[for='start-date-input']")

    FILTER_TAG_ICON = (By.CSS_SELECTOR, "label[for='tag']")
