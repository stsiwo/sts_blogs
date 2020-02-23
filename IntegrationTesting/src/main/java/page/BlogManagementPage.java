package main.java.page;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;

import main.java.base.Config;
import main.java.uimapper.BlogFilterSortUIMapper;
import main.java.uimapper.BlogManagementUIMapper;
import main.java.uimapper.BlogManagementUIMapper;
import main.java.uimapper.UpdateBlogUIMapper;

public class BlogManagementPage extends BasePage {

	public final static String name = "blog_management";
	
	public final static String url = Config.getInstance().getValue("baseUrl") + "/setting/blogs";
	
	public BlogManagementPage(WebDriver driver, boolean independent, String email, String password) {
		super(driver);
		if (independent) {
			this.routetoBlogManagementPage(email, password);
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(BlogManagementUIMapper.PAGE_TITLE));
	}

	public BlogManagementPage(WebDriver driver, boolean independent) {
		super(driver);
		if (independent) {
			try {
				throw new Exception("need email & password. use another constructor method.");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(BlogManagementUIMapper.PAGE_TITLE));
	}
	
	public BlogManagementPage routetoBlogManagementPage(String email, String password) {
		LoginPage loginPage = new LoginPage(this.driver, true);
		loginPage.initialLogin(email, password, password);
		this.driver.get(BlogManagementPage.url);
		return new BlogManagementPage(this.driver, false);
	}
	
	public UpdateBlogPage clickEditIconOfOneOfTheBlogItems(int num) {
		
		WebElement blogElement = this.getOneOfBlogItems(num);
		// hover 
		Actions action = new Actions(this.driver); 
		action.moveToElement(blogElement).build().perform();
		
		// need to continuous action perform for clicking edit icon
		WebElement editElement = this.waitForElementBy(BlogManagementUIMapper.EDIT_BLOG_ICON);
		action.moveToElement(editElement).click().build().perform();
		
		this.waitForElementBy(UpdateBlogUIMapper.PAGE_TITLE);
		return new UpdateBlogPage(this.driver, false);
	}

	public void clickDeleteIconOfOneOfTheBlogItems(int num) {
		
		WebElement blogElement = this.getOneOfBlogItems(num);
		// hover 
		Actions action = new Actions(this.driver); 
		action.moveToElement(blogElement).perform();
		
		// need to continuous action perform for clicking edit icon
		WebElement editElement = this.waitForElementBy(BlogManagementUIMapper.DELETE_BLOG_ICON);
		action.moveToElement(editElement).click().build().perform();
		
		Alert alert = this.switchToDialog();
		alert.accept();
	}


	public void waitForElementStartDateFetchCompleteBy(By locator, Date date) {
		
		boolean flag = true;
		int attempt = 0;
		
		while (flag) {
			if (attempt == 100) break; 
			System.out.println("waiting " + locator.toString() + " to have string contains " + date.toString());
			WebElement element = this.waitForElementBy(locator);
			Date targetDate;
			try {
				targetDate = new SimpleDateFormat("EEEE, MMMM dd, yyyy").parse(element.getText());
				if (targetDate.compareTo(date) >= 0) {
					flag = false;
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			attempt += 1;
		}
	}

	public void waitForElementEndDateFetchCompleteBy(By locator, Date date) {
		
		boolean flag = true;
		int attempt = 0;
		
		while (flag) {
			if (attempt == 100) break; 
			System.out.println("waiting " + locator.toString() + " to have string contains " + date.toString());
			WebElement element = this.waitForElementBy(locator);
			Date targetDate;
			try {
				targetDate = new SimpleDateFormat("EEEE, MMMM dd, yyyy").parse(element.getText());
				if (targetDate.compareTo(date) <= 0) {
					flag = false;
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			attempt += 1;
		}
	}
 	
	public void waitForElementKeywordFetchCompleteBy(By locator, String keyword) {
		
		boolean flag = true;
		int attempt = 0;
		
		while (flag) {
			if (attempt == 100) break; 
			System.out.println("waiting " + locator.toString() + " to have string contains " + keyword);
			WebElement element = this.waitForElementBy(locator);
			if (element.getText().contains(keyword)) {
				flag = false;
			}
			attempt += 1;
		}
	}
	
	public WebElement getOneOfBlogItems(int num) {
		List<WebElement> blogElementList = this.getListOfElementsBy(BlogManagementUIMapper.BLOG_ITEM);
		return blogElementList.get(num);
	}

	public int getNumberOfBlogItemDisplayed() {
		List<WebElement> elements = this.getListOfElementsBy(BlogManagementUIMapper.BLOG_ITEM);
		return elements.size();
	}

	public String getOneOfBlogTitle() {
		List<WebElement> elements = this.getListOfElementsBy(BlogManagementUIMapper.BLOG_ITEM_TITLE);
		return elements.get(0).getText();
	}
	
	public void enterTagInFilterBy(String tag) {
		this.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_TAG_INPUT, tag, true);
		this.pressBy(BlogFilterSortUIMapper.FILTER_TAG_INPUT, Keys.ENTER);
	}
}
