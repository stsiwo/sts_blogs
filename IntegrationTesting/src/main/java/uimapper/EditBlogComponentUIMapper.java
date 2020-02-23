package main.java.uimapper;

import org.openqa.selenium.By;

public class EditBlogComponentUIMapper {

    public final static By MAIN_IMAGE_INPUT = By.cssSelector("input[id='update-blog-picture-input']");
    		  
    public final static By IMAGE_DELETE_ICON = By.cssSelector("div[role='avatar-delete-icon']");
      
    public final static By BLOG_TITLE_INPUT = By.cssSelector("input[id='title']");
      
    public final static By BLOG_SUBTITLE_INPUT = By.cssSelector("input[id='subtitle']");

    public final static By BLOG_TAG_INPUT = By.cssSelector("input[id='tag']");
      
    public final static By BLOG_TAG_DELETE_ICON = By.cssSelector("div[class='small-icon-wrapper tags-item-close-icon-wrapper']");
      
    public final static By BLOG_CONTENT_INPUT = By.cssSelector("div[role='blog-content-editable']");
      
    public final static By IMAGE_TOOLBAR_ICON = By.cssSelector("span[role='image-toolbar-icon']");
  
    public final static By EMBEDS_TOOLBAR_ICON = By.cssSelector("span[role='embeds-toolbar-icon']");
      
    public final static By PUBLISH_BUTTON = By.cssSelector("input[role='publish-btn']");

}
