package main.java.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.By;

import main.java.base.Config;
import main.java.uimapper.SignupUIMapper;

public final class SignupPage extends BasePage {
	
	public final static String name = "signup";
	
	public final static String url = Config.getInstance().getValue("baseUrl") + "/signup";
	
	public SignupPage(WebDriver driver, boolean independent) {
		super(driver);
		if (independent) {
			this.driver.get(this.url);
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(SignupUIMapper.PAGE_TITLE));
	}
	
	public void signup(String name, String email, String password) {
    this.enterSignupInfoAndWaitForErrorDisappear(SignupUIMapper.NAME_INPUT, name, SignupUIMapper.NAME_ERROR);
    this.enterEmailInfoAndWaitForSuccessIcon(email);
    this.enterSignupInfoAndWaitForErrorDisappear(SignupUIMapper.PASSWORD_INPUT, password, SignupUIMapper.PASSWORD_ERROR);
    this.enterSignupInfoAndWaitForErrorDisappear(SignupUIMapper.CONFIRM_INPUT, password, SignupUIMapper.CONFIRM_ERROR);
		this.clickElementBy(SignupUIMapper.SUBMIT_BUTTON);
	}

  public void enterEmailInfoAndWaitForSuccessIcon(String text) {
		this.enterTextInElementBy(SignupUIMapper.EMAIL_INPUT, text, true);
    this.waitForElementBy(SignupUIMapper.TYPE_AHEAD_SUCCESS_ICON);
  }

  public void enterEmailInfoAndWaitForEmailAlreadyExistErrorMsg(String text) {
		this.enterTextInElementBy(SignupUIMapper.EMAIL_INPUT, text, true);
    this.waitForElementBy(SignupUIMapper.FIELD_ERROR);
  }

  public void enterSignupInfoAndWaitForErrorDisappear(By locator, String text, By errorLocator) {
		this.enterTextInElementBy(locator, text, true);
    this.waitForElementToBeInvisibleBy(SignupUIMapper.FIELD_ERROR);
  }
}
