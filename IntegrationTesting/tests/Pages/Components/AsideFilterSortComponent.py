from tests.Pages.BasePage import BasePage
from tests.Locators.AsideFilterSortComponentLocators import AsideFilterSortComponentLocators


class AsideFilterSortComponent(BasePage):
    """AsideFilterSort page action methods come here. I.e. Python.org"""

    element_locators = {
            'filter_sort_aside': AsideFilterSortComponentLocators.FILTER_SORT_ASIDE,
            'sort_date_asc_icon': AsideFilterSortComponentLocators.SORT_DATE_ASC_ICON,
            'sort_date_desc_icon': AsideFilterSortComponentLocators.SORT_DATE_DESC_ICON,
            'sort_title_asc_icon': AsideFilterSortComponentLocators.SORT_TITLE_ASC_ICON,
            'sort_title_desc_icon': AsideFilterSortComponentLocators.SORT_TITLE_DESC_ICON,
            'sort_clap_asc_icon': AsideFilterSortComponentLocators.SORT_CLAP_ASC_ICON,
            'sort_clap_desc_icon': AsideFilterSortComponentLocators.SORT_CLAP_DESC_ICON,
            'filter_keyword_input': AsideFilterSortComponentLocators.FILTER_KEYWORD_INPUT,
            'filter_start_date_input': AsideFilterSortComponentLocators.FILTER_START_DATE_INPUT,
            'filter_end_date_input': AsideFilterSortComponentLocators.FILTER_END_DATE_INPUT,
            'filter_tag_input': AsideFilterSortComponentLocators.FILTER_TAG_INPUT,
            'setting_icon': AsideFilterSortComponentLocators.SETTING_ICON,
            'refresh_icon': AsideFilterSortComponentLocators.REFRESH_ICON,
            'limit_select': AsideFilterSortComponentLocators.LIMIT_SELECT,
            'limit_40_option': AsideFilterSortComponentLocators.LIMIT_40_OPTION,
            'fetch_status_title': AsideFilterSortComponentLocators.FETCH_STATUS_TITLE,
            'page_4_btn': AsideFilterSortComponentLocators.PAGE_4_BTN,
            'page_first_btn': AsideFilterSortComponentLocators.PAGE_FIRST_BTN,
            'page_last_btn': AsideFilterSortComponentLocators.PAGE_LAST_BTN,
            'blog_list_fetching': AsideFilterSortComponentLocators.BLOG_LIST_FETCHING,
            'blog_item_title': AsideFilterSortComponentLocators.BLOG_ITEM_TITLE,
            'blog_item_created_date': AsideFilterSortComponentLocators.BLOG_ITEM_CREATED_DATE,
            'blog_item_clap': AsideFilterSortComponentLocators.BLOG_ITEM_CLAP,
            'blog_item_tag': AsideFilterSortComponentLocators.BLOG_ITEM_TAG,
            }

    def __init__(self, driver):
        super().__init__(driver)
