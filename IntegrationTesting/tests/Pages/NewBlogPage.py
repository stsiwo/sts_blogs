from tests.Pages.Components.HeaderComponent import HeaderComponent
from tests.Pages.Components.FooterComponent import FooterComponent
from tests.config import new_blog_url
from selenium.webdriver.common.by import By
from utils import wait_for_element
from tests.Locators.NewBlogPageLocators import NewBlogPageLocators


class NewBlogPage(HeaderComponent, FooterComponent):
    """NewBlog page action methods come here. I.e. Python.org"""

    name = 'new_blog'

    element_locators = {
            'page_title': NewBlogPageLocators.PAGE_TITLE,
            'profile_link': NewBlogPageLocators.PROFILE_LINK,
            'blog_management_link': NewBlogPageLocators.BLOG_MANAGEMENT_LINK,
            'main_image_input': NewBlogPageLocators.MAIN_IMAGE_INPUT,
            'image_delete_icon': NewBlogPageLocators.IMAGE_DELETE_ICON,
            'blog_title_input': NewBlogPageLocators.BLOG_TITLE_INPUT,
            'blog_subtitle_input': NewBlogPageLocators.BLOG_SUBTITLE_INPUT,
            'blog_tag_input': NewBlogPageLocators.BLOG_TAG_INPUT,
            'blog_tag_delete_icon': NewBlogPageLocators.BLOG_TAG_DELETE_ICON,
            'blog_content_input': NewBlogPageLocators.BLOG_CONTENT_INPUT,
            'image_toolbar_icon': NewBlogPageLocators.IMAGE_TOOLBAR_ICON,
            'embeds_toolbar_icon': NewBlogPageLocators.EMBEDS_TOOLBAR_ICON,
            'publish_button': NewBlogPageLocators.PUBLISH_BUTTON,
            'fetch_status_title': NewBlogPageLocators.FETCH_STATUS_TITLE
            }

    def __init__(self, driver, independent: bool = True):
        """
            independent param: whether driver directory load this page independently (true) or load from another page (e.g., Home Page) as dependency
        """
        super().__init__(driver)
        # merge all parent element locators with this element locators
        # ends up self.element_locators include all parent element locators
        self.element_locators = {
                **self.element_locators,
                **HeaderComponent.element_locators,
                **FooterComponent.element_locators,
                }

        if independent:
            self.driver.get(new_blog_url)
            # need this one to avoid 'NosuchElementException'
            # - esp for when find element by link test
            # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
        wait_for_element(self.driver, By.ID, 'root')
