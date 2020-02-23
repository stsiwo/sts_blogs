package main.java.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

import main.java.base.Config;
import main.java.uimapper.BlogListUIMapper;
import main.java.uimapper.BlogManagementUIMapper;
import main.java.uimapper.BlogUIMapper;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.LoginUIMapper;

public class LoginPage extends BasePage {

	public final static String name = "login";
	
	public final static String url = Config.getInstance().getValue("baseUrl") + "/login";
	
	public LoginPage(WebDriver driver, boolean independent) {
		super(driver);
		if (independent) {
			this.driver.get(this.url);
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(LoginUIMapper.PAGE_TITLE));
	}
	
	public void login(String email, String password, String confirm) {
		this.enterTextInElementBy(LoginUIMapper.EMAIL_INPUT, email, true);
		this.enterTextInElementBy(LoginUIMapper.PASSWORD_INPUT, password, true);
		this.enterTextInElementBy(LoginUIMapper.CONFIRM_INPUT, confirm, true);
		this.clickElementBy(LoginUIMapper.SUBMIT_BUTTON);
	}
	
	public void initialLogin(String email, String password, String confirm) {
		this.enterTextInElementBy(LoginUIMapper.EMAIL_INPUT, email, true);
		this.enterTextInElementBy(LoginUIMapper.PASSWORD_INPUT, password, true);
		this.enterTextInElementBy(LoginUIMapper.CONFIRM_INPUT, confirm, true);
		this.clickElementBy(LoginUIMapper.SUBMIT_BUTTON);
		
		this.waitForElementBy(HomeUIMapper.SLOGAN);
	}
}
