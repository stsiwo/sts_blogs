package main.java.uimapper;

import org.openqa.selenium.By;

public class ProfileUIMapper {

    public final static By PAGE_TITLE = By.cssSelector("h2[class='page-title']");
    	      
    public final static By USER_NAME_INPUT = By.cssSelector("input[id='name']");
      
    public final static By USER_EMAIL_INPUT = By.cssSelector("input[id='email']");
      
    public final static By USER_PASSWORD_INPUT = By.cssSelector("input[id='password']");
      
    public final static By USER_CONFIRM_INPUT = By.cssSelector("input[id='confirm']");
      
    public final static By USER_AVATAR_IMAGE = By.cssSelector("img[class='profile-picture-img']");

    public final static By USER_AVATAR_IMAGE_INPUT = By.cssSelector("input[id='profile-picture-input']");
      
    public final static By AVATAR_IMAGE_DELETE_ICON = By.cssSelector("div[role='avatar-delete-icon']");
    
    public final static By UPDATE_BTN = By.cssSelector("button[role='update-btn']");
      
    public final static By BLOG_MANAGEMENT_LINK = By.linkText("Blog Management");
      
    // xpath stuck at Chrome & Firefox
    public final static By TO_MANAGE_BUTTON = By.cssSelector("button[role='to-manage-btn']");

    public final static By FETCH_STATUS_TITLE = By.cssSelector("h3[class='fetch-status-title']");
}
