package main.java.uimapper;

import org.openqa.selenium.By;

public final class SignupUIMapper {

    public final static By PAGE_TITLE = By.cssSelector("h2[class='page-title-center']");
	
    public final static By NAME_INPUT = By.id("name");
    	    
    public final static By NAME_ERROR = By.className("div.name-error");
    
    public final static By EMAIL_INPUT = By.id("email");
    
    public final static By EMAIL_ERROR = By.className("div.email-error");
    
    public final static By PASSWORD_INPUT = By.id("password");
    
    public final static By PASSWORD_ERROR = By.className("div.password-error");
    
    public final static By CONFIRM_INPUT = By.id("confirm");

    public final static By CONFIRM_ERROR = By.className("div.confirm-error");

    public final static By FIELD_ERROR = By.cssSelector("div[role='input-field-error-msg']");

    public final static By TYPE_AHEAD_SUCCESS_ICON = By.cssSelector("div[role='checkmark-icon']");
    
    public final static By SUMMARY_ERROR = By.cssSelector("div[role='summary-error']");
    
    public final static By SUBMIT_BUTTON = By.cssSelector("input[role='signup-btn']");
    
    public final static By LOGIN_LINK = By.linkText("Login Page");
    
    public final static By FETCH_ERR_MSG = By.cssSelector("p.fetch-status-err-msg");

}
