package main.java.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

import main.java.base.Config;
import main.java.uimapper.BlogListUIMapper;
import main.java.uimapper.BlogManagementUIMapper;
import main.java.uimapper.BlogUIMapper;

public class BlogPage extends BasePage {

	public final static String name = "blog";
	
	public final static String url = Config.getInstance().getValue("baseUrl") + "/blogs/";
	
	public BlogPage(WebDriver driver, boolean independent) {
		super(driver);
		if (independent) {
			this.routeToBlogpage();
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(BlogUIMapper.BLOG_PAGE_TITLE));
	}
	
	public BlogPage routeToBlogpage() {
		HomePage homePage = new HomePage(this.driver, true); 
		return homePage.clickOneOfBlogItems(2); 
	}
}
