package test.java.example;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ListIterator;

import org.json.simple.JSONObject;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import main.java.base.Config;
import main.java.page.NewBlogPage;
import main.java.page.BlogListPage;
import main.java.page.HomePage;
import main.java.page.LoginPage;
import main.java.page.SignupPage;
import main.java.page.SignupPage;
import main.java.uimapper.BlogFilterSortUIMapper;
import main.java.uimapper.BlogListUIMapper;
import main.java.uimapper.EditBlogComponentUIMapper;
import main.java.uimapper.HeaderComponentUIMapper;
import main.java.uimapper.NewBlogUIMapper;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.SignupUIMapper;

public class NewBlogPageTest extends BaseTest {

  @AfterMethod
  public void logout() {
	  this.driver.get(HomePage.url);
	  HomePage homePage = new HomePage(this.driver, false);
	  homePage.headerComponent.logout(); 
  }
  @Test(dataProvider = "all-size")
  public void shouldDisplayNewBlogPageHeading(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  NewBlogPage newBlogPage = new NewBlogPage(this.driver, true, this.testUser.email, this.testUser.password);
	  Assert.assertEquals(newBlogPage.getTextOfElementBy(NewBlogUIMapper.PAGE_TITLE), "New Blog");
  }
  
  @Test(dataProvider = "all-size")
  public void shouldSaveNewBlog(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  NewBlogPage newBlogPage = new NewBlogPage(this.driver, true, this.testUser.email, this.testUser.password);
	  newBlogPage.scrollToTop();

	  File testImageFile = new File(this.getTestResourcePath("test_image.jpg"));
	  
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.MAIN_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_TITLE_INPUT, "sample blog title", true);
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_SUBTITLE_INPUT, "sample blog subtitle", true);
	  newBlogPage.enterTagInInput("selenium");
	  
	  newBlogPage.scrollToTop();
	  newBlogPage.waitAnimationEnd();
	  
	  newBlogPage.waitForElementToHaveTextBy(NewBlogUIMapper.FETCH_STATUS_TITLE, "ok");
	  Assert.assertTrue(true);
  }

  @Test(dataProvider = "all-size")
  public void shouldPublishNewBlog(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  NewBlogPage newBlogPage = new NewBlogPage(this.driver, true, this.testUser.email, this.testUser.password);
	  newBlogPage.scrollToTop();

	  File testImageFile = new File(this.getTestResourcePath("test_image1.jpg"));
	  
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.MAIN_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_TITLE_INPUT, "sample blog title", true);
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_SUBTITLE_INPUT, "sample blog subtitle", true);
	  newBlogPage.enterTagInInput("selenium");
	  
	  newBlogPage.scrollToBottom();
	  newBlogPage.waitAnimationEnd();
	  newBlogPage.clickElementBy(EditBlogComponentUIMapper.PUBLISH_BUTTON);

	  newBlogPage.scrollToTop();
	  newBlogPage.waitAnimationEnd();
	  try {
		  newBlogPage.waitForElementToHaveTextBy(NewBlogUIMapper.FETCH_STATUS_TITLE, "ok");
	  } catch (TimeoutException e) {
		  newBlogPage.takeScreenshot("publish-new-blog");
		  throw e;
	  }
	  Assert.assertTrue(true);
  }

  @Test(dataProvider = "desktop")
  public void shouldNotDisplayNonPublishedBlogAtBlogListPage(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  NewBlogPage newBlogPage = new NewBlogPage(this.driver, true, this.testUser.email, this.testUser.password);
	  newBlogPage.scrollToTop();
	  
	  String targetBlogTitle = this.faker.lorem().sentence();

	  File testImageFile = new File(this.getTestResourcePath("test_image.jpg"));
	  
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.MAIN_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_TITLE_INPUT, targetBlogTitle, true);
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_SUBTITLE_INPUT, "sample blog subtitle", true);
	  newBlogPage.enterTagInInput("selenium");
	  
	  newBlogPage.scrollToTop();
	  newBlogPage.waitAnimationEnd();
	  newBlogPage.waitForElementToHaveTextBy(NewBlogUIMapper.FETCH_STATUS_TITLE, "ok");
	  
	  newBlogPage.driver.get(BlogListPage.url);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, false);
	  blogListPage.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_KEYWORD_INPUT, targetBlogTitle, true);
	  blogListPage.waitForElementBy(BlogFilterSortUIMapper.NO_SEARCH_RESULT_TITLE);
	  Assert.assertTrue(true);
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayPublishedBlogAtBlogListPage(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  NewBlogPage newBlogPage = new NewBlogPage(this.driver, true, this.testUser.email, this.testUser.password);
	  newBlogPage.scrollToTop();
	  
	  String targetBlogTitle = this.faker.lorem().sentence();

	  File testImageFile = new File(this.getTestResourcePath("test_image.jpg"));
	  
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.MAIN_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_TITLE_INPUT, targetBlogTitle, true);
	  newBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_SUBTITLE_INPUT, "sample blog subtitle", true);
	  newBlogPage.enterTagInInput("selenium");
	  
	  newBlogPage.scrollToTop();
	  newBlogPage.waitAnimationEnd();
	  newBlogPage.waitForElementToHaveTextBy(NewBlogUIMapper.FETCH_STATUS_TITLE, "ok");

	  newBlogPage.scrollToBottom();
	  newBlogPage.waitAnimationEnd();
	  newBlogPage.clickElementBy(EditBlogComponentUIMapper.PUBLISH_BUTTON);

	  newBlogPage.scrollToTop();
	  newBlogPage.waitAnimationEnd();
	  newBlogPage.waitForElementToHaveTextBy(NewBlogUIMapper.FETCH_STATUS_TITLE, "ok");
	  
	  newBlogPage.driver.get(BlogListPage.url);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, false);
	  blogListPage.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_KEYWORD_INPUT, targetBlogTitle, true);
	  blogListPage.waitForElementBy(BlogListUIMapper.BLOG_ITEM);
	  Assert.assertTrue(true);
  }
}
