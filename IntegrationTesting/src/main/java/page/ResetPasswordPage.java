package main.java.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

import main.java.base.Config;
import main.java.base.EmailHelper;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.ResetPasswordUIMapper;

public class ResetPasswordPage extends BasePage {

	public final static String name = "reset-password";
	
	public final static String url = Config.getInstance().getValue("baseUrl") + "/password-reset";
	
	public ResetPasswordPage(WebDriver driver, boolean independent) {
		super(driver);
		if (independent) {
			this.driver.get(this.url);
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(ResetPasswordUIMapper.PAGE_TITLE));
	}
	
  public void fillInputsBy(String password, String confirm) {
    this.enterTextInElementBy(ResetPasswordUIMapper.PASSWORD_INPUT, password, true); 
    this.enterTextInElementBy(ResetPasswordUIMapper.CONFIRM_INPUT, confirm, true); 
  }

  public void submitResetPasswordForm() {
    this.clickElementBy(ResetPasswordUIMapper.SUBMIT_BUTTON);
  }
}
