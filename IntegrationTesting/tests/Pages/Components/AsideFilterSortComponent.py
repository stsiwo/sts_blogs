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
            'filter_tag_input': AsideFilterSortComponentLocators.FILTER_TAG_INPUT
            }

    def __init__(self, driver):
        super().__init__(driver)
