package main.java.page;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import main.java.base.Config;
import main.java.uimapper.BlogFilterSortUIMapper;
import main.java.uimapper.BlogListUIMapper;

public class BlogListPage extends BasePage {

	public final static String name = "blog_list";
	
	public final static String url = Config.getInstance().getValue("baseUrl") + "/blogs";
	
	public BlogListPage(WebDriver driver, boolean independent) {
		super(driver);
		if (independent) {
			this.driver.get(this.url);
		}
		this.wait.until(ExpectedConditions.presenceOfElementLocated(BlogListUIMapper.PAGE_TITLE));
	}
	
	public int getNumberOfBlogItemDisplayed() {
		List<WebElement> elements = this.getListOfElementsBy(BlogListUIMapper.BLOG_ITEM);
		return elements.size();
	}

	public String getOneOfBlogTitle() {
		List<WebElement> elements = this.getListOfElementsBy(BlogListUIMapper.BLOG_ITEM_TITLE);
		return elements.get(0).getText();
	}
	
	public void enterTagInFilterBy(String tag) {
		this.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_TAG_INPUT, tag, true);
		this.pressBy(BlogFilterSortUIMapper.FILTER_TAG_INPUT, Keys.ENTER);
	}
	
	public void waitForElementStartDateFetchCompleteBy(By locator, Date date) {
		
		boolean flag = true;
		int attempt = 0;
		
		while (flag && attempt <= 100) {
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
}
