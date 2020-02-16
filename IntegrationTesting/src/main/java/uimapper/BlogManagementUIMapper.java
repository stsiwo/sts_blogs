package main.java.uimapper;

import org.openqa.selenium.By;

public class BlogManagementUIMapper {

    public final static By PAGE_TITLE = By.cssSelector("h2[class='page-title']");
    		  
    public final static By PROFILE_LINK = By.cssSelector("a[role='profile-link']");
      
    public final static By BLOG_ITEM = By.cssSelector("div[role='blog-item']");
      
    public final static By NEW_BLOG_ICON = By.cssSelector("a[role='new-blog-link']");

	public final static By BLOG_ITEM_TITLE = By.cssSelector("h2[class='blog-list-item-desc-title']");
      
    public final static By EDIT_BLOG_ICON = By.cssSelector("a[role='blog-edit-link']");
      
    public final static By DELETE_BLOG_ICON = By.cssSelector("div[role='blog-delete-icon']"); 

}
