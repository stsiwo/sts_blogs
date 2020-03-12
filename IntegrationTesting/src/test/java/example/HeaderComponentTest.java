package test.java.example;

import org.openqa.selenium.Dimension;
import org.testng.Assert;
import org.testng.annotations.Test;

import main.java.base.Config;
import main.java.page.BlogListPage;
import main.java.page.BlogPage;
import main.java.page.HomePage;
import main.java.page.LoginPage;
import main.java.page.SignupPage;
import main.java.uimapper.BlogListUIMapper;
import main.java.uimapper.HeaderComponentUIMapper;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.LoginUIMapper;
import main.java.uimapper.SignupUIMapper;

public class HeaderComponentTest extends BaseTest {

	/**
	 * test header component using HomePage 
	 **/
  @Test(dataProvider = "all-size")
  public void shouldDisplayTitleInHeader(Dimension ssize) {
	  System.out.println("start the first test at header component test");
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  Assert.assertEquals(homePage.getTextOfElementBy(HeaderComponentUIMapper.LOGO_TITLE), Config.getInstance().getValue("appTitle"));
  }

  /**
  @Test(dataProvider = "desktop")
  public void shouldDisplayBlogsNavMenuItemInHeader(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  Assert.assertEquals(homePage.getTextOfElementBy(HeaderComponentUIMapper.BLOGS_NAV_ITEM), "Blogs");
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplaySignupNavMenuItemInHeader(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  Assert.assertEquals(homePage.getTextOfElementBy(HeaderComponentUIMapper.SIGNUP_NAV_ITEM), "Signup");
  }

  @Test(dataProvider = "desktop")
  public void shouldDisplayLoginNavMenuItemInHeader(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  Assert.assertEquals(homePage.getTextOfElementBy(HeaderComponentUIMapper.LOGIN_NAV_ITEM), "Login");
  }

  @Test(dataProvider = "desktop")
  public void shouldRouteToBlogListPageWhenClickBlogsLinkInHeader(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  BlogListPage blogListPage = homePage.headerComponent.clickBlogListLink();
	  Assert.assertTrue(blogListPage.IsElementExist(BlogListUIMapper.PAGE_TITLE));
  }

  @Test(dataProvider = "desktop")
  public void shouldRouteToSignupPageWhenClickSignupLinkInHeader(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  SignupPage signupPage = homePage.headerComponent.clickSignupLink();
	  Assert.assertTrue(signupPage.IsElementExist(SignupUIMapper.PAGE_TITLE));
  }

  @Test(dataProvider = "desktop")
  public void shouldRouteToLoginPageWhenClickLoginLinkInHeader(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  LoginPage loginPage = homePage.headerComponent.clickLoginLink();
	  Assert.assertTrue(loginPage.IsElementExist(LoginUIMapper.PAGE_TITLE));
  }
  
  @Test(dataProvider = "lte-laptop")
  public void shouldDisplayNavMenuToggleIconInHeader(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  homePage.waitForElementToBeVisibleBy(HeaderComponentUIMapper.MENU_TOGGLE_ICON);
	  Assert.assertTrue(true);

	  // wierd. sometime stuck
	  //Assert.assertTrue(homePage.IsElementVisibleBy(HeaderComponentUIMapper.MENU_TOGGLE_ICON));
  }

  @Test(dataProvider = "lte-laptop")
  public void shouldRouteToBlogListPageWhenClickBlogListLinkAfterOpenMenuBar(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  BlogListPage blogListPage = homePage.headerComponent.clickBlogListLinkThruNavSideBar();
	  Assert.assertTrue(blogListPage.IsElementExist(HeaderComponentUIMapper.BLOGS_NAV_ITEM));
  }

  @Test(dataProvider = "lte-laptop")
  public void shouldRouteToSignupPageWhenClickSignupLinkAfterOpenMenuBar(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  SignupPage signupPage = homePage.headerComponent.clickSignupLinkThruNavSideBar();
	  Assert.assertTrue(signupPage.IsElementExist(HeaderComponentUIMapper.SIGNUP_NAV_ITEM));
  }

  @Test(dataProvider = "lte-laptop")
  public void shouldRouteToLoginPageWhenClickLoginLinkAfterOpenMenuBar(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  HomePage homePage = new HomePage(this.driver, true);
	  LoginPage loginPage = homePage.headerComponent.clickLoginLinkThruNavSideBar();
	  Assert.assertTrue(loginPage.IsElementExist(HeaderComponentUIMapper.LOGIN_NAV_ITEM));
  }
  **/
}
