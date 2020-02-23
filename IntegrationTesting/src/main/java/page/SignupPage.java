package main.java.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

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
		this.enterTextInElementBy(SignupUIMapper.NAME_INPUT, name, true);
		this.enterTextInElementBy(SignupUIMapper.EMAIL_INPUT, email, true);
		this.enterTextInElementBy(SignupUIMapper.PASSWORD_INPUT, password, true);
		this.enterTextInElementBy(SignupUIMapper.CONFIRM_INPUT, password, true);
		this.clickElementBy(SignupUIMapper.SUBMIT_BUTTON);
	}
}
