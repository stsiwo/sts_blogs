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
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import main.java.base.Config;
import main.java.page.BlogManagementPage;
import main.java.page.HomePage;
import main.java.page.LoginPage;
import main.java.page.NewBlogPage;
import main.java.page.SignupPage;
import main.java.page.UpdateBlogPage;
import main.java.page.SignupPage;
import main.java.uimapper.BlogFilterSortUIMapper;
import main.java.uimapper.BlogManagementUIMapper;
import main.java.uimapper.HeaderComponentUIMapper;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.NewBlogUIMapper;
import main.java.uimapper.SignupUIMapper;
import main.java.uimapper.UpdateBlogUIMapper;

public class BlogManagementPageTest extends BaseTest {

  @AfterMethod
  public void logout() {
	  this.driver.get(HomePage.url);
	  HomePage homePage = new HomePage(this.driver, false);
	  homePage.headerComponent.logout(); 
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogManagementPageHeading(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  Assert.assertEquals(blogManagementPage.getTextOfElementBy(BlogManagementUIMapper.PAGE_TITLE), "Blog Management");
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayInitialFetchSuccessMessageSuccess(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  blogManagementPage.waitForElementToHaveTextBy(BlogFilterSortUIMapper.FETCH_STATUS_TITLE, "success");
	  Assert.assertEquals(blogManagementPage.getTextOfElementBy(BlogFilterSortUIMapper.FETCH_STATUS_TITLE), "success");
  }

  @Test(dataProvider = "lte-tablet")
  public void shouldDisplaySortAndFilterOverlaySettingWhenClickSettingBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.SETTING_ICON);
	  blogManagementPage.waitAnimationEnd();
	  Assert.assertTrue(blogManagementPage.IsElementExistWithWait(BlogFilterSortUIMapper.FILTER_SORT_CLOSE_ICON));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogManagementAfterClickLimitChangeElement(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.LIMIT_SELECT, BlogFilterSortUIMapper.LIMIT_40_OPTION);
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.LIMIT_40_OPTION);
	  blogManagementPage.waitForElementBy(BlogManagementUIMapper.BLOG_ITEM);
	  Assert.assertEquals(blogManagementPage.getNumberOfBlogItemDisplayed(), 40);
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogManagementAfterClickRefreshBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.REFRESH_ICON, BlogManagementUIMapper.BLOG_ITEM);
	  Assert.assertTrue(blogManagementPage.IsElementExist(BlogManagementUIMapper.BLOG_ITEM));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogManagementAfterInitialFetch(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  Assert.assertEquals(blogManagementPage.getNumberOfBlogItemDisplayed(), 20);
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogManagementAfterChangeDifferentPage(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  String initialBlogTitle = blogManagementPage.getOneOfBlogTitle();
	  
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.PAGE_4_BTN, BlogManagementUIMapper.BLOG_ITEM);
	  
	  String lastBlogTitle = blogManagementPage.getOneOfBlogTitle();
	  
	  Assert.assertNotEquals(initialBlogTitle, lastBlogTitle);
  }
  
  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogManagementAfterClickTheLastpageBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  String initialBlogTitle = blogManagementPage.getOneOfBlogTitle();
	  
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.PAGE_LAST_BTN, BlogManagementUIMapper.BLOG_ITEM);
	  
	  String lastBlogTitle = blogManagementPage.getOneOfBlogTitle();
	  
	  Assert.assertNotEquals(initialBlogTitle, lastBlogTitle);
  }
  
  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogManagementAfterClickTheFirstPageBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  String initialBlogTitle = blogManagementPage.getOneOfBlogTitle();
	  
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.PAGE_LAST_BTN, BlogManagementUIMapper.BLOG_ITEM);
	  
	  String lastBlogTitle = blogManagementPage.getOneOfBlogTitle();
	  
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.PAGE_FIRST_BTN, BlogManagementUIMapper.BLOG_ITEM);
	  
	  String firstBlogTitle = blogManagementPage.getOneOfBlogTitle();

	  Assert.assertNotEquals(initialBlogTitle, lastBlogTitle);
	  Assert.assertEquals(initialBlogTitle, firstBlogTitle);
  }
  
  // only test desktop size. assuming if passed, it works in all screen size 
  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementSortedByDateAsc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  List<WebElement> elements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE);
	  
	  List<Date> dateList = new ArrayList<Date>();
	  
	  for (WebElement element : elements) {
		 try {
			dateList.add(new SimpleDateFormat("EEEE, MMMM dd, yyyy").parse(element.getText()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	  }
	  
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  Assert.assertTrue(dateList.get(i).compareTo((dateList.get(i+1))) <= 0);
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementSortedByDateDesc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.SORT_DATE_DESC_ICON, BlogManagementUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE);
	  
	  List<Date> dateList = new ArrayList<Date>();
	  
	  for (WebElement element : elements) {
		 try {
			dateList.add(new SimpleDateFormat("EEEE, MMMM dd, yyyy").parse(element.getText()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	  }
	  
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  Assert.assertTrue(dateList.get(i).compareTo(dateList.get(i+1)) >= 0);
	  }
  }
  
  
  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementSortedByTitleAsc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.SORT_TITLE_ASC_ICON, BlogManagementUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_TITLE);
	  
	  List<String> dateList = new ArrayList<String>();
	  
	  for (WebElement element : elements) {
		  dateList.add(element.getText());
	  }
	  
	  System.out.println("sort title asc content");
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  System.out.println(dateList.get(i));
		  if (!dateList.get(i).isEmpty())
			  Assert.assertTrue(Character.compare(Character.toUpperCase(dateList.get(i).charAt(0)), Character.toUpperCase(dateList.get(i+1).charAt(0))) <= 0);
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementSortedByTitleDesc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.SORT_TITLE_DESC_ICON, BlogManagementUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_TITLE);
	  
	  List<String> dateList = new ArrayList<String>();
	  
	  for (WebElement element : elements) {
		  dateList.add(element.getText());
	  }
	  
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  Assert.assertTrue(Character.compare(Character.toUpperCase(dateList.get(i).charAt(0)), Character.toUpperCase(dateList.get(i+1).charAt(0))) >= 0);
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementSortedByClapAsc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.SORT_CLAP_ASC_ICON, BlogManagementUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CLAP);
	  
	  List<String> dateList = new ArrayList<String>();
	  
	  for (WebElement element : elements) {
		  dateList.add(element.getText().replaceAll("[^0-9]", ""));
	  }
	  
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  Assert.assertTrue(Integer.parseInt(dateList.get(i)) <= Integer.parseInt(dateList.get(i+1)));
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementSortedByClapDesc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.clickElementBy(BlogFilterSortUIMapper.SORT_CLAP_DESC_ICON, BlogManagementUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CLAP);
	  
	  List<String> dateList = new ArrayList<String>();
	  
	  for (WebElement element : elements) {
		  dateList.add(element.getText().replaceAll("[^0-9]", ""));
	  }
	  
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  Assert.assertTrue(Integer.parseInt(dateList.get(i)) >= Integer.parseInt(dateList.get(i+1)));
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementAfterKeywordFilterChange(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);

	  String blogTitle = blogManagementPage.getOneOfBlogTitle();
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_KEYWORD_INPUT, blogTitle, true);;
	  
	  blogManagementPage.waitForElementKeywordFetchCompleteBy(BlogFilterSortUIMapper.BLOG_ITEM_TITLE, blogTitle);
	  
	  List<WebElement> blogElements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_TITLE);
	  blogManagementPage.takeScreenshot("blog-management-after-keyword-" + this.setup.getBrowser());
	  
	  List<String> titleList = new ArrayList<String>();
	  
	  for (WebElement element : blogElements) {
		  try {
			  titleList.add(element.getText());
		} catch (StaleElementReferenceException e) {
			e.printStackTrace();
		}
	  }
	  
	  System.out.println("shouldDisplayBlogManagementAfterKeywordFilterChange");
	  for (String title : titleList) {
		  System.out.println(title);
		  System.out.println(title.contains(blogTitle));
		  Assert.assertTrue(title.contains(blogTitle));
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementAfterStartDateFilterChange(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  String testDateString = "01/01/2010";
	  Date testDate = null;
	  try {
		  testDate = new SimpleDateFormat("MM/dd/yyyy").parse(testDateString);
	  } catch (ParseException e) {
		  // TODO Auto-generated catch block
		  e.printStackTrace();
	  }
	  
	  blogManagementPage.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_START_DATE_INPUT, testDateString, true);;
	  
	  blogManagementPage.waitForElementStartDateFetchCompleteBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE, testDate);
	  blogManagementPage.takeScreenshot("blog-management-start-date-" + this.setup.getBrowser());
	  
	  List<WebElement> blogElements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE);
	  
	  List<Date> dateList = new ArrayList<Date>();
	  
	  for (WebElement element : blogElements) {
		 try {
			dateList.add(new SimpleDateFormat("EEEE, MMMM dd, yyyy").parse(element.getText()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	  }
	  
	  System.out.println("shouldDisplayBlogManagementAfterStartDateFilterChange");
	  for (int i = 0; i < dateList.size(); i++) {
		  System.out.println(dateList.get(i));
		  System.out.println(testDate.compareTo(dateList.get(i)));
		  Assert.assertTrue(testDate.compareTo(dateList.get(i)) <= 0 );
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementAfterEndDateFilterChange(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  String testDateString = "01/01/2010";
	  Date testDate = null;
	  try {
		  testDate = new SimpleDateFormat("MM/dd/yyyy").parse(testDateString);
	  } catch (ParseException e) {
		  // TODO Auto-generated catch block
		  e.printStackTrace();
	  }
	  
	  blogManagementPage.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_END_DATE_INPUT, testDateString, true);;
	  
	  blogManagementPage.waitForElementEndDateFetchCompleteBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE, testDate);

	  List<WebElement> blogElements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE);
	  
	  List<Date> dateList = new ArrayList<Date>();
	  
	  for (WebElement element : blogElements) {
		 try {
			dateList.add(new SimpleDateFormat("EEEE, MMMM dd, yyyy").parse(element.getText()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	  }
	  
	  for (int i = 0; i < dateList.size(); i++) {
		  Assert.assertTrue(testDate.compareTo(dateList.get(i)) >= 0 );
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogManagementAfterTagFilterChange(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.enterTagInFilterBy("js");
	  blogManagementPage.waitAnimationEnd();
	  blogManagementPage.waitForElementBy(BlogManagementUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogManagementPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_TAG);
	  
	  for (WebElement element: elements) {
		  Assert.assertTrue(element.getText().contains("js"));
	  }
	  
  }
  @Test(dataProvider = "all-size")
  public void shouldrouteUsertoNewBlogpageWhenClickNewBlogLink(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.clickElementBy(BlogManagementUIMapper.NEW_BLOG_ICON);
	  
	  NewBlogPage newBlog = new NewBlogPage(this.driver, false);
	  
	  Assert.assertTrue(newBlog.IsElementExist(NewBlogUIMapper.PAGE_TITLE));
	  
  }

  @Test(dataProvider = "all-size")
  public void shouldRouteUserToUpdateBlogPageWhenClickEditBlogLinkOfSpecificBlogItem(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.clickEditIconOfOneOfTheBlogItems(0);
	  
	  UpdateBlogPage updateBlogPage = new UpdateBlogPage(this.driver, false);
	  
	  Assert.assertTrue(updateBlogPage.IsElementExist(UpdateBlogUIMapper.PAGE_TITLE));
	  
  }

  @Test(dataProvider = "all-size")
  public void shouldDeleteASpecificBlogItemWhenClickDeleteButtonOnTheBlogItem(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, true, this.testUser.email, this.testUser.password);
	  // need this
	  blogManagementPage.waitAnimationEnd();
	  
	  blogManagementPage.clickDeleteIconOfOneOfTheBlogItems(0);
	  
	  blogManagementPage.waitForElementToHaveTextBy(BlogFilterSortUIMapper.FETCH_STATUS_TITLE, "success");
	  
	  Assert.assertTrue(true);
	  
  }
}
