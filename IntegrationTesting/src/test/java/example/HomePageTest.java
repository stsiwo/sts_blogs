package test.java.example;

import org.openqa.selenium.Dimension;
import org.testng.Assert;
import org.testng.annotations.Test;

import main.java.page.BlogListPage;
import main.java.page.HomePage;
import main.java.page.SignupPage;
import main.java.uimapper.HomeUIMapper;

public class HomePageTest extends BaseTest {

  @Test(dataProvider = "all-size")
  public void shouldRouteSearchResultPageWhenSearchInHome(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  homePage.clickElementBy(HomeUIMapper.SEARCH_BUTTON, HomeUIMapper.SEARCH_INPUT);
	  homePage.enterTextInSearchInput("test");
	  
	  BlogListPage blogListPage = new BlogListPage(this.driver, false);
	  
	  Assert.assertTrue(blogListPage.isExistInPage("Blog List"));
  }

  @Test(dataProvider = "all-size")
  public void shouldRouteSignupPageWhenJoinBtnIsClicked(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  homePage.clickElementBy(HomeUIMapper.JOIN_BUTTON);
	  
	  SignupPage signupPage = new SignupPage(this.driver, false);
	  
	  Assert.assertTrue(signupPage.isExistInPage("Signup"));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplay5Blog_itemAtInitialLoad(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  homePage.waitForElementBy(HomeUIMapper.BLOG_ITEM);
	  homePage.takeScreenshot("home_initial_load");
	  
	  Assert.assertEquals(5, homePage.getListOfElementsBy(HomeUIMapper.BLOG_ITEM).size());
  }

  @Test(dataProvider = "all-size")
  public void shouldFetchPopularBlogWhenClickPopularBtn(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  
	  homePage.waitForElementBy(HomeUIMapper.BLOG_ITEM);
	  String beforeBlogTitle = homePage.getOneOfBlogTitle();
	  
	  homePage.clickElementBy(HomeUIMapper.POPULAR_BUTTON);
	  
	  homePage.waitForElementBy(HomeUIMapper.BLOG_ITEM);
	  String afterBlogTitle = homePage.getOneOfBlogTitle();
	  
	  Assert.assertNotEquals(beforeBlogTitle, afterBlogTitle);
  }
}
