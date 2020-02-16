package main.java.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

import main.java.base.Config;
import main.java.uimapper.BlogListUIMapper;
import main.java.uimapper.BlogManagementUIMapper;
import main.java.uimapper.BlogUIMapper;
import main.java.uimapper.LoginUIMapper;
import main.java.uimapper.NewBlogUIMapper;
import main.java.uimapper.ProfileUIMapper;

public class ProfilePage extends BasePage {

	public final static String name = "profile";
	
	public final static String url = Config.getInstance().getValue("baseUrl") + "/setting/profile";
	
	public ProfilePage(WebDriver driver, boolean independent, String email, String password) {
		super(driver);
		if (independent) {
			this.routeToProfilePage(email, password);
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(ProfileUIMapper.PAGE_TITLE));
	}
	
	public ProfilePage(WebDriver driver, boolean independent) {
		// TODO Auto-generated constructor stub
		super(driver);
		if (independent) {
			try {
				throw new Exception("need email & password. use another constructor method.");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(ProfileUIMapper.PAGE_TITLE));
	}
	
	public ProfilePage routeToProfilePage(String email, String password) {
		LoginPage loginPage = new LoginPage(this.driver, true);
		loginPage.initialLogin(email, password, password);
		HomePage homePage = new HomePage(this.driver, false); 
		this.driver.get(ProfilePage.url);
		return new ProfilePage(this.driver, false);
	}
}
