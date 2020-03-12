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
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import main.java.base.Config;
import main.java.page.UpdateBlogPage;
import main.java.page.BlogListPage;
import main.java.page.HomePage;
import main.java.page.LoginPage;
import main.java.page.SignupPage;
import main.java.page.SignupPage;
import main.java.uimapper.BlogFilterSortUIMapper;
import main.java.uimapper.BlogListUIMapper;
import main.java.uimapper.EditBlogComponentUIMapper;
import main.java.uimapper.HeaderComponentUIMapper;
import main.java.uimapper.UpdateBlogUIMapper;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.SignupUIMapper;

public class UpdateBlogPageTest extends BaseTest {

  @AfterMethod
  public void logout() {
	  this.driver.get(HomePage.url);
	  HomePage homePage = new HomePage(this.driver, false);
	  homePage.headerComponent.logout(); 
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayUpdateBlogPageHeading(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  UpdateBlogPage updateBlogPage = new UpdateBlogPage(this.driver, true, this.testUser.email, this.testUser.password);
	  Assert.assertEquals(updateBlogPage.getTextOfElementBy(UpdateBlogUIMapper.PAGE_TITLE), "Update Blog");
  }

  @Test(dataProvider = "all-size")
  public void shouldSaveUpdateBlog(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  UpdateBlogPage updateBlogPage = new UpdateBlogPage(this.driver, true, this.testUser.email, this.testUser.password);
	  updateBlogPage.scrollToTop();

	  File testImageFile = new File("src/test/resources/test_image.jpg");
	  
	  updateBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.MAIN_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  updateBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_TITLE_INPUT, "sample blog title", true);
	  updateBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_SUBTITLE_INPUT, "sample blog subtitle", true);
	  updateBlogPage.enterTagInInput("selenium");
	  
	  updateBlogPage.scrollToTop();
	  updateBlogPage.waitAnimationEnd();
	  
	  updateBlogPage.waitForElementToHaveTextBy(UpdateBlogUIMapper.FETCH_STATUS_TITLE, "ok");
	  Assert.assertTrue(true);
  }

  @Test(dataProvider = "all-size")
  public void shouldPublishUpdateBlog(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  UpdateBlogPage updateBlogPage = new UpdateBlogPage(this.driver, true, this.testUser.email, this.testUser.password);
	  updateBlogPage.scrollToTop();

	  File testImageFile = new File("src/test/resources/test_image.jpg");
	  
	  updateBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.MAIN_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  updateBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_TITLE_INPUT, "sample blog title", true);
	  updateBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_SUBTITLE_INPUT, "sample blog subtitle", true);
	  updateBlogPage.enterTagInInput("selenium");
	  
	  updateBlogPage.scrollToBottom();
	  updateBlogPage.waitAnimationEnd();
	  updateBlogPage.clickElementBy(EditBlogComponentUIMapper.PUBLISH_BUTTON);

	  updateBlogPage.scrollToTop();
	  updateBlogPage.waitAnimationEnd();
	  updateBlogPage.waitForElementToHaveTextBy(UpdateBlogUIMapper.FETCH_STATUS_TITLE, "ok");
	  Assert.assertTrue(true);
  }
  
  @Test(dataProvider = "laptop")
  public void shouldDisplayPublishedBlogAtBlogListPage(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  UpdateBlogPage updateBlogPage = new UpdateBlogPage(this.driver, true, this.testUser.email, this.testUser.password);
	  updateBlogPage.scrollToTop();
	  
	  String targetBlogTitle = this.faker.lorem().sentence();

	  File testImageFile = new File("src/test/resources/test_image.jpg");
	  
	  updateBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.MAIN_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  updateBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_TITLE_INPUT, targetBlogTitle, true);
	  updateBlogPage.enterTextInElementBy(EditBlogComponentUIMapper.BLOG_SUBTITLE_INPUT, "sample blog subtitle", true);
	  updateBlogPage.enterTagInInput("selenium");
	  
	  updateBlogPage.scrollToTop();
	  updateBlogPage.waitAnimationEnd();
	  updateBlogPage.waitForElementToHaveTextBy(UpdateBlogUIMapper.FETCH_STATUS_TITLE, "ok");

	  updateBlogPage.scrollToBottom();
	  updateBlogPage.waitAnimationEnd();
	  updateBlogPage.clickElementBy(EditBlogComponentUIMapper.PUBLISH_BUTTON);

	  updateBlogPage.scrollToTop();
	  updateBlogPage.waitAnimationEnd();
	  updateBlogPage.waitForElementToHaveTextBy(UpdateBlogUIMapper.FETCH_STATUS_TITLE, "ok");
	  
	  updateBlogPage.driver.get(BlogListPage.url);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, false);
	  blogListPage.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_KEYWORD_INPUT, targetBlogTitle, true);
	  blogListPage.waitForElementBy(BlogListUIMapper.BLOG_ITEM);
	  Assert.assertTrue(true);
  }
  
}
