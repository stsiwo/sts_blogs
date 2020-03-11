package main.java.uimapper;

import org.openqa.selenium.By;

public class LoginUIMapper {

    public final static By PAGE_TITLE = By.cssSelector("h2[class='page-title-center']");

    public final static By EMAIL_INPUT = By.id("email");
    		  
    public final static By EMAIL_ERROR = By.className("div.email-error");
      
    public final static By PASSWORD_INPUT = By.id("password");
      
    public final static By PASSWORD_ERROR = By.className("div.password-error");
      
    public final static By CONFIRM_INPUT = By.id("confirm");
      
    public final static By CONFIRM_ERROR = By.className("div.confirm-error");
      
    public final static By FIELD_ERROR = By.cssSelector("div[role='input-field-error-msg']");

    public final static By TYPE_AHEAD_SUCCESS_ICON = By.cssSelector("div[role='checkmark-icon']");

    public final static By SUMMARY_ERROR = By.cssSelector("div[role='summary-error']");
      
    public final static By SUBMIT_BUTTON = By.cssSelector("input[role='login-btn']");
      
    public final static By SIGNUP_LINK = By.linkText("Signup Page"); 
  
    public final static By FETCH_ERR_MSG = By.cssSelector("p.fetch-status-err-msg");

    public final static By FORGOT_PASSWORD_LINK = By.cssSelector("a[role='forgot-password-link']");
    
    public final static By FORGOT_PASSWORD_MODAL = By.cssSelector("div[role='forgot-password-email-modal']");

    public final static By FORGOT_PASSWORD_EMAIL_INPUT = By.id("forgot-password-email");

    public final static By FORGOT_PASSWORD_SUBMIT_BTN = By.cssSelector("input[role='forgot-password-btn']");

    public final static By FORGOT_PASSWORD_MODAL_CLOSE_ICON = By.cssSelector("div[role='close-forgot-password-modal-link']");

    public final static By FETCHING_STATUS = By.cssSelector("h3[role='fetching-status']");
    
    public final static By FETCHE_SUCCESS_STATUS = By.cssSelector("h3[role='fetch-success-status']");

    public final static By FETCH_FAILURE_STATUS = By.cssSelector("h3[role='fetch-failure-status']");

}
