from tests.Pages.Components.HeaderComponent import HeaderComponent
from tests.Pages.Components.FooterComponent import FooterComponent
from tests.config import update_blog_url
from selenium.webdriver.common.by import By
from utils import wait_for_element
from tests.Locators.UpdateBlogPageLocators import UpdateBlogPageLocators


class UpdateBlogPage(HeaderComponent, FooterComponent):
    """UpdateBlog page action methods come here. I.e. Python.org"""

    name = 'update_blog'

    element_locators = {
            'page_title': UpdateBlogPageLocators.PAGE_TITLE,
            'profile_link': UpdateBlogPageLocators.PROFILE_LINK,
            'blog_management_link': UpdateBlogPageLocators.BLOG_MANAGEMENT_LINK
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
            self.driver.get(update_blog_url)
            # need this one to avoid 'NosuchElementException'
            # - esp for when find element by link test
            # reference: https://stackoverflow.com/questions/6936149/how-to-use-find-element-by-link-text-properly-to-not-raise-nosuchelementexcept
        wait_for_element(self.driver, By.ID, 'root')
