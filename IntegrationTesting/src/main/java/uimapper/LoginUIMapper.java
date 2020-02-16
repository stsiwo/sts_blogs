package main.java.uimapper;

import org.openqa.selenium.By;

public class LoginUIMapper {

    public final static By PAGE_TITLE = By.cssSelector("h2[class='login-form-title']");

    public final static By EMAIL_INPUT = By.id("email");
    		  
    public final static By EMAIL_ERROR = By.className("div.email-error");
      
    public final static By PASSWORD_INPUT = By.id("password");
      
    public final static By PASSWORD_ERROR = By.className("div.password-error");
      
    public final static By CONFIRM_INPUT = By.id("confirm");
      
    public final static By CONFIRM_ERROR = By.className("div.confirm-error");
      
    public final static By SUMMARY_ERROR = By.className("div.summary-error");
      
    public final static By SUBMIT_BUTTON = By.cssSelector("input[role='login-btn']");
      
    public final static By SIGNUP_LINK = By.linkText("Signup Page"); 
  
    public final static By FETCH_ERR_MSG = By.cssSelector("p.fetch-status-err-msg");


}
