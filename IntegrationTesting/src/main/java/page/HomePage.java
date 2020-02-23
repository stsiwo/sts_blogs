package main.java.page;

import java.util.List;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import main.java.base.Config;
import main.java.uimapper.BlogUIMapper;
import main.java.uimapper.HomeUIMapper;

public final class HomePage extends BasePage {
	
	public final static String name = "home";
	
	public final static String url = Config.getInstance().getValue("baseUrl");
	
	public HeaderComponent headerComponent = new HeaderComponent(this.driver);

	public FooterComponent footerComponent = new FooterComponent(this.driver);
	
	public HomePage(WebDriver driver, boolean independent) {
		super(driver);
		if (independent) {
			this.driver.get(this.url);
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(HomeUIMapper.SLOGAN));
	}
	
	public void enterTextInSearchInput(String text) {
		WebElement searchInputElement = this.driver.findElement(HomeUIMapper.SEARCH_INPUT);
		searchInputElement.sendKeys(text);
		searchInputElement.sendKeys(Keys.RETURN);
	}
	
	public String getOneOfBlogTitle() {
		List<WebElement> elements = this.getListOfElementsBy(HomeUIMapper.BLOG_ITEM_TITLE);
		return elements.get(0).getText();
	}
	
	public BlogPage clickOneOfBlogItems(int num) {
		List<WebElement> elements = this.getListOfElementsBy(HomeUIMapper.BLOG_ITEM_TITLE);
		elements.get(num).click();
		this.waitForElementBy(BlogUIMapper.BLOG_PAGE_TITLE);
		return new BlogPage(this.driver, false);
	}
	
	public WebElement getOneOfBlogItem(int num) {
		List<WebElement> elements = this.getListOfElementsBy(HomeUIMapper.BLOG_ITEM_TITLE);
		return elements.get(num);
	}
	
	
	

}
