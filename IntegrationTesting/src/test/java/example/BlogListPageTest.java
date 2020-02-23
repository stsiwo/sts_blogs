package test.java.example;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ListIterator;

import org.json.simple.JSONObject;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

import main.java.base.Config;
import main.java.page.BlogListPage;
import main.java.page.HomePage;
import main.java.page.LoginPage;
import main.java.page.SignupPage;
import main.java.page.SignupPage;
import main.java.uimapper.BlogFilterSortUIMapper;
import main.java.uimapper.BlogListUIMapper;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.SignupUIMapper;

public class BlogListPageTest extends BaseTest {

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogListPageHeading(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  Assert.assertEquals(blogListPage.getTextOfElementBy(BlogListUIMapper.PAGE_TITLE), "Blog List");
  }

  @Test(dataProvider = "gte-laptop")
  public void shouldGuideUserToSignupPageAfterClickJoinBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  blogListPage.clickElementBy(BlogListUIMapper.JOIN_BUTTON);
	  SignupPage signupPage = new SignupPage(this.driver, false);
	  Assert.assertEquals(signupPage.getTextOfElementBy(SignupUIMapper.PAGE_TITLE), "Signup");
  }

  @Test(dataProvider = "lte-tablet")
  public void shouldGuideUserToSignupPageAfterClickJoinBtnForSmallScreenSize(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  blogListPage.scrollToBottom();
	  blogListPage.waitAnimationEnd();
	  blogListPage.clickElementBy(BlogListUIMapper.JOIN_BUTTON);
	  SignupPage signupPage = new SignupPage(this.driver, false);
	  Assert.assertEquals(signupPage.getTextOfElementBy(SignupUIMapper.PAGE_TITLE), "Signup");
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayInitialFetchSuccessMessageSuccess(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  blogListPage.waitForElementToHaveTextBy(BlogFilterSortUIMapper.FETCH_STATUS_TITLE, "success");
	  Assert.assertEquals(blogListPage.getTextOfElementBy(BlogFilterSortUIMapper.FETCH_STATUS_TITLE), "success");
  }

  @Test(dataProvider = "lte-tablet")
  public void shouldDisplaySortAndFilterOverlaySettingWhenClickSettingBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.SETTING_ICON);
	  blogListPage.waitAnimationEnd();
	  Assert.assertTrue(blogListPage.IsElementExistWithWait(BlogFilterSortUIMapper.FILTER_SORT_CLOSE_ICON));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogListAfterClickLimitChangeElement(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.LIMIT_SELECT, BlogFilterSortUIMapper.LIMIT_40_OPTION);
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.LIMIT_40_OPTION, BlogListUIMapper.BLOG_ITEM);
	  Assert.assertEquals(blogListPage.getNumberOfBlogItemDisplayed(), 40);
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogListAfterClickRefreshBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.REFRESH_ICON, BlogListUIMapper.BLOG_ITEM);
	  Assert.assertTrue(blogListPage.IsElementExist(BlogListUIMapper.BLOG_ITEM));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogListAfterInitialFetch(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  Assert.assertEquals(blogListPage.getNumberOfBlogItemDisplayed(), 20);
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogListAfterChangeDifferentPage(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  String initialBlogTitle = blogListPage.getOneOfBlogTitle();
	  
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.PAGE_4_BTN, BlogListUIMapper.BLOG_ITEM);
	  
	  String lastBlogTitle = blogListPage.getOneOfBlogTitle();
	  
	  Assert.assertNotEquals(initialBlogTitle, lastBlogTitle);
  }
  
  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogListAfterClickTheLastpageBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  String initialBlogTitle = blogListPage.getOneOfBlogTitle();
	  
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.PAGE_LAST_BTN, BlogListUIMapper.BLOG_ITEM);
	  
	  String lastBlogTitle = blogListPage.getOneOfBlogTitle();
	  
	  Assert.assertNotEquals(initialBlogTitle, lastBlogTitle);
  }
  
  
  @Test(dataProvider = "all-size")
  public void shouldDisplayBlogListAfterClickTheFirstPageBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  String initialBlogTitle = blogListPage.getOneOfBlogTitle();
	  
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.PAGE_LAST_BTN, BlogListUIMapper.BLOG_ITEM);
	  
	  String lastBlogTitle = blogListPage.getOneOfBlogTitle();
	  
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.PAGE_FIRST_BTN, BlogListUIMapper.BLOG_ITEM);
	  
	  String firstBlogTitle = blogListPage.getOneOfBlogTitle();

	  Assert.assertNotEquals(initialBlogTitle, lastBlogTitle);
	  Assert.assertEquals(initialBlogTitle, firstBlogTitle);
  }
  
  // only test desktop size. assuming if passed, it works in all screen size 
  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogListSortedByDateAsc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  List<WebElement> elements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE);
	  
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
		  Assert.assertTrue(dateList.get(i).compareTo(dateList.get(i+1)) <= 0);
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogListSortedByDateDesc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.SORT_DATE_DESC_ICON, BlogListUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE);
	  
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
  public void shouldDisplayBlogListSortedByTitleAsc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.SORT_TITLE_ASC_ICON, BlogListUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_TITLE);
	  
	  List<String> dateList = new ArrayList<String>();
	  
	  for (WebElement element : elements) {
		  dateList.add(element.getText());
	  }
	  
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  Assert.assertTrue(Character.compare(Character.toUpperCase(dateList.get(i).charAt(0)), Character.toUpperCase(dateList.get(i+1).charAt(0))) <= 0);
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogListSortedByTitleDesc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.SORT_TITLE_DESC_ICON, BlogListUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_TITLE);
	  
	  List<String> dateList = new ArrayList<String>();
	  
	  for (WebElement element : elements) {
		  dateList.add(element.getText());
	  }
	  
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  Assert.assertTrue(Character.compare(Character.toUpperCase(dateList.get(i).charAt(0)), Character.toUpperCase(dateList.get(i+1).charAt(0))) >= 0);
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogListSortedByClapAsc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.SORT_CLAP_ASC_ICON, BlogListUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CLAP);
	  
	  List<String> dateList = new ArrayList<String>();
	  
	  for (WebElement element : elements) {
		  dateList.add(element.getText().replaceAll("[^0-9]", ""));
	  }
	  
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  Assert.assertTrue(Integer.parseInt(dateList.get(i)) <= Integer.parseInt(dateList.get(i+1)));
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogListSortedByClapDesc(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  blogListPage.clickElementBy(BlogFilterSortUIMapper.SORT_CLAP_DESC_ICON, BlogListUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CLAP);
	  
	  List<String> dateList = new ArrayList<String>();
	  
	  for (WebElement element : elements) {
		  dateList.add(element.getText().replaceAll("[^0-9]", ""));
	  }
	  
	  for (int i = 0; i < dateList.size() - 1; i++) {
		  Assert.assertTrue(Integer.parseInt(dateList.get(i)) >= Integer.parseInt(dateList.get(i+1)));
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogListAfterKeywordFilterChange(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);

	  String blogTitle = blogListPage.getOneOfBlogTitle();
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  blogListPage.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_KEYWORD_INPUT, blogTitle, true);;
	  
	  blogListPage.waitForElementKeywordFetchCompleteBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE, blogTitle);
	  
	  List<WebElement> blogElements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_TITLE);
	  
	  List<String> titleList = new ArrayList<String>();
	  
	  for (WebElement element : blogElements) {
			 try {
				titleList.add(element.getText());
			} catch (StaleElementReferenceException e) {
				e.printStackTrace();
			}
		  }
	  
	  for (String title : titleList) {
		  System.out.println("shouldDisplayBlogListAfterKeywordFilterChange");
		  System.out.println(title);
		  Assert.assertTrue(title.contains(blogTitle));
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogListAfterStartDateFilterChange(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  String testDateString = "01/01/2010";
	  Date testDate = null;
	  try {
		  testDate = new SimpleDateFormat("MM/dd/yyyy").parse(testDateString);
	  } catch (ParseException e) {
		  // TODO Auto-generated catch block
		  e.printStackTrace();
	  }
	  
	  blogListPage.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_START_DATE_INPUT, testDateString, true);;
	  
	  blogListPage.waitForElementStartDateFetchCompleteBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE, testDate);
	  
	  List<WebElement> blogElements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE);
	  
	  List<Date> dateList = new ArrayList<Date>();
	  
	  for (WebElement element : blogElements) {
		 try {
			dateList.add(new SimpleDateFormat("EEEE, MMMM dd, yyyy").parse(element.getText()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (StaleElementReferenceException e) {
			e.printStackTrace();
		}
	  }
	  
	  System.out.println("shouldDisplayBlogListAfterStartDateFilterChange");
	  for (int i = 0; i < dateList.size(); i++) {
		  System.out.println(dateList.get(i));
		  System.out.println(testDate.compareTo(dateList.get(i)) <= 0 );
		  Assert.assertTrue(testDate.compareTo(dateList.get(i)) <= 0 );
	  }
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogListAfterEndDateFilterChange(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  String testDateString = "01/01/2010";
	  Date testDate = null;
	  try {
		  testDate = new SimpleDateFormat("MM/dd/yyyy").parse(testDateString);
	  } catch (ParseException e) {
		  // TODO Auto-generated catch block
		  e.printStackTrace();
	  }
	  
	  blogListPage.enterTextInElementBy(BlogFilterSortUIMapper.FILTER_END_DATE_INPUT, testDateString, true);;
	  
	  blogListPage.waitForElementEndDateFetchCompleteBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE, testDate);
	  
	  List<WebElement> blogElements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_CREATED_DATE);
	  
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
  public void shouldDisplayBlogListAfterTagFilterChange(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);

	  BlogListPage blogListPage = new BlogListPage(this.driver, true);
	  // need this
	  blogListPage.waitAnimationEnd();
	  
	  blogListPage.enterTagInFilterBy("js");
	  blogListPage.waitAnimationEnd();
	  blogListPage.waitForElementBy(BlogListUIMapper.BLOG_ITEM);
	  
	  List<WebElement> elements = blogListPage.getListOfElementsBy(BlogFilterSortUIMapper.BLOG_ITEM_TAG);
	  
	  for (WebElement element: elements) {
		  Assert.assertTrue(element.getText().contains("js"));
	  }
	  
  }
}
