from selenium.webdriver.common.by import By
from tests.Locators.BaseLocator import BaseLocator


class NewBlogPageLocators(BaseLocator):
    """A class for main page locators. All main page locators should come here"""

    # By.CLASS_NAME behave wierdly

    PAGE_TITLE = (By.CSS_SELECTOR, "h2[class='page-title']")

    PROFILE_LINK = (By.LINK_TEXT, "Profile")

    BLOG_MANAGEMENT_LINK = (By.LINK_TEXT, "Blog Management")

    # blog info
    MAIN_IMAGE_INPUT = (By.CSS_SELECTOR, "input[id='update-blog-picture-input']")

    IMAGE_DELETE_ICON = (By.CSS_SELECTOR, "div[role='avatar-delete-icon']")

    BLOG_TITLE_INPUT = (By.CSS_SELECTOR, "input[id='title']")

    BLOG_SUBTITLE_INPUT = (By.CSS_SELECTOR, "input[id='subtitle']")

    BLOG_TAG_INPUT = (By.CSS_SELECTOR, "input[id='tag']")

    BLOG_TAG_DELETE_ICON = (By.CSS_SELECTOR, "div[class='small-icon-wrapper tags-item-close-icon-wrapper']")

    BLOG_CONTENT_INPUT = (By.CSS_SELECTOR, "div[role='blog-content-editable']")

    # toolbar
    IMAGE_TOOLBAR_ICON = (By.CSS_SELECTOR, "span[role='image-toolbar-icon']")

    EMBEDS_TOOLBAR_ICON = (By.CSS_SELECTOR, "span[role='embeds-toolbar-icon']")

    # publish
    PUBLISH_BUTTON = (By.CSS_SELECTOR, "input[role='publish-btn']")

    # fetch status
    FETCH_STATUS_TITLE = (By.CSS_SELECTOR, "h3[class='fetch-status-title']")
