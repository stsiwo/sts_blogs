package main.java.page;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

import main.java.base.Config;
import main.java.uimapper.BlogListUIMapper;
import main.java.uimapper.BlogManagementUIMapper;
import main.java.uimapper.BlogUIMapper;
import main.java.uimapper.EditBlogComponentUIMapper;
import main.java.uimapper.LoginUIMapper;
import main.java.uimapper.NewBlogUIMapper;

public class UpdateBlogPage extends BasePage {

	public final static String name = "update_blog";
	
	public final static String url = Config.getInstance().getValue("baseUrl") + "/setting/blogs/update/";
	
	public UpdateBlogPage(WebDriver driver, boolean independent, String email, String password) {
		super(driver);
		if (independent) {
			this.routeToUpdateBlogPage(email, password);
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(NewBlogUIMapper.PAGE_TITLE));
	}
	
	public UpdateBlogPage(WebDriver driver, boolean independent) {
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
		this.wait.until(ExpectedConditions.presenceOfElementLocated(NewBlogUIMapper.PAGE_TITLE));
	}
	
	public UpdateBlogPage routeToUpdateBlogPage(String email, String password) {
		LoginPage loginPage = new LoginPage(this.driver, true);
		loginPage.initialLogin(email, password, password);
		HomePage homePage = new HomePage(this.driver, false);
		this.driver.get(BlogManagementPage.url);
		BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, false);
		
		return blogManagementPage.clickEditIconOfOneOfTheBlogItems(3);
	}

	public void enterTagInInput(String tag) {
		this.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_TAG_INPUT, tag, true);
		this.pressBy(EditBlogComponentUIMapper.BLOG_TAG_INPUT, Keys.ENTER);
	}
}
