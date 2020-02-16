package test.java.example;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ListIterator;

import org.json.simple.JSONObject;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import main.java.base.Config;
import main.java.page.BlogPage;
import main.java.page.HomePage;
import main.java.page.LoginPage;
import main.java.page.SignupPage;
import main.java.page.SignupPage;
import main.java.uimapper.BlogFilterSortUIMapper;
import main.java.uimapper.BlogUIMapper;
import main.java.uimapper.HeaderComponentUIMapper;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.SignupUIMapper;

public class BlogPageTest extends BaseTest {

	@Test(dataProvider = "all-size")
	public void shouldDisplayBlogAtBlogPage(Dimension ssize) {
		this.driver.manage().window().setSize(ssize);

		HomePage homePage = new HomePage(this.driver, true);

		homePage.waitForElementBy(HomeUIMapper.BLOG_ITEM);
		WebElement element = homePage.getOneOfBlogItem(0);
		String blogTitle = element.getText();

		element.click();

		homePage.waitAnimationEnd();
		BlogPage blogPage = new BlogPage(this.driver, false);
		blogPage.waitForElementBy(BlogUIMapper.BLOG_PAGE_TITLE);

		Assert.assertEquals(blogPage.getTextOfElementBy(BlogUIMapper.BLOG_PAGE_TITLE), blogTitle);
	}

}
