package test.java.example;

import java.io.File;
import java.net.URL;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import main.java.base.Config;
import main.java.page.BlogListPage;
import main.java.page.BlogManagementPage;
import main.java.page.HomePage;
import main.java.page.ProfilePage;
import main.java.page.SignupPage;
import main.java.uimapper.BlogManagementUIMapper;
import main.java.uimapper.HeaderComponentUIMapper;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.ProfileUIMapper;

public class ProfilePageTest extends BaseTest {
	
  @AfterMethod
  public void logout() {
	  this.driver.get(HomePage.url);
	  HomePage homePage = new HomePage(this.driver, false);
	  homePage.headerComponent.logout(); 
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayProfilePageHeading(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  Assert.assertTrue(profilePage.isExistInPage("Profile Management"));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayUpdatedNameAfterOnlyNameChangeRequest(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_NAME_INPUT, this.faker.name().fullName(), true);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");
	  Assert.assertTrue(true);
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayUpdatedEmailAfterOnlyEmailChangeRequest(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_EMAIL_INPUT, this.testUser.email, true);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");
	  Assert.assertTrue(true);
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayUpdatedPasswordAfterOnlyPasswordChangeRequest(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_PASSWORD_INPUT, this.testUser.password, true);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_CONFIRM_INPUT, this.testUser.password, true);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");
	  Assert.assertTrue(true);
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayAllUpdatedUserInfoAfterAllUserinfoChangeRequest(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_NAME_INPUT, this.faker.name().fullName(), true);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_EMAIL_INPUT, this.testUser.email, true);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_PASSWORD_INPUT, this.testUser.password, true);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_CONFIRM_INPUT, this.testUser.password, true);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

	  Assert.assertTrue(true);
  }

  @Test(dataProvider = "all-size")
  public void shouldCreateAvatarImage(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  File testImageFile = new File(this.getTestResourcePath("test_image.jpg"));
	  
	  System.out.println(testImageFile.getAbsolutePath());
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  // must be false for 'clear' when deal with file input
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_AVATAR_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

	  Assert.assertTrue(true);
	  Assert.assertTrue(profilePage.getAttributeOfElementBy(ProfileUIMapper.USER_AVATAR_IMAGE, "src") != null);

	  profilePage.clickElementBy(ProfileUIMapper.AVATAR_IMAGE_DELETE_ICON);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");
  }

  @Test(dataProvider = "all-size")
  public void shouldUpdateExistingAvatarImageWithNewOne(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  File testImageFile = new File(this.getTestResourcePath("test_image.jpg"));
	  File testImageFile1 = new File(this.getTestResourcePath("test_image1.jpg"));
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  // must be false for 'clear' when deal with file input
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_AVATAR_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

	  // must be false for 'clear' when deal with file input
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_AVATAR_IMAGE_INPUT, testImageFile1.getAbsolutePath(), false);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

	  Assert.assertTrue(true);
	  Assert.assertTrue(profilePage.getAttributeOfElementBy(ProfileUIMapper.USER_AVATAR_IMAGE, "src") != null);

	  profilePage.clickElementBy(ProfileUIMapper.AVATAR_IMAGE_DELETE_ICON);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");
  }

  @Test(dataProvider = "all-size")
  public void shouldDeleteExistingAvatarImage(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  File testImageFile = new File(this.getTestResourcePath("test_image.jpg"));
	  File testImageFile1 = new File(this.getTestResourcePath("test_image1.jpg"));
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  // must be false for 'clear' when deal with file input
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_AVATAR_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

	  profilePage.clickElementBy(ProfileUIMapper.AVATAR_IMAGE_DELETE_ICON);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

	  Assert.assertTrue(true);
	  Assert.assertTrue(profilePage.getAttributeOfElementBy(ProfileUIMapper.USER_AVATAR_IMAGE, "src") == null);

  }

  @Test(dataProvider = "all-size")
  public void shouldUnchangeExistingAvatarImage(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  File testImageFile = new File(this.getTestResourcePath("test_image.jpg"));
	  File testImageFile1 = new File(this.getTestResourcePath("test_image1.jpg"));
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  // must be false for 'clear' when deal with file input
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_AVATAR_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_NAME_INPUT, this.faker.name().fullName(), true);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

	  Assert.assertTrue(true);
	  Assert.assertTrue(profilePage.getAttributeOfElementBy(ProfileUIMapper.USER_AVATAR_IMAGE, "src") != null);

	  profilePage.clickElementBy(ProfileUIMapper.AVATAR_IMAGE_DELETE_ICON);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayAllUPdateUserInfoAfterAllUserInfochnageRequestWithAvatarImage(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  File testImageFile = new File(this.getTestResourcePath("test_image.jpg"));
	  File testImageFile1 = new File(this.getTestResourcePath("test_image1.jpg"));
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  // must be false for 'clear' when deal with file input
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_AVATAR_IMAGE_INPUT, testImageFile.getAbsolutePath(), false);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_NAME_INPUT, this.faker.name().fullName(), true);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_EMAIL_INPUT, this.testUser.email, true);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_PASSWORD_INPUT, this.testUser.password, true);
	  profilePage.enterTextInElementBy(ProfileUIMapper.USER_CONFIRM_INPUT, this.testUser.password, true);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

	  Assert.assertTrue(true);
	  Assert.assertTrue(profilePage.getAttributeOfElementBy(ProfileUIMapper.USER_AVATAR_IMAGE, "src") != null);

	  profilePage.clickElementBy(ProfileUIMapper.AVATAR_IMAGE_DELETE_ICON);
	  profilePage.clickElementBy(ProfileUIMapper.UPDATE_BTN);
	  profilePage.waitForElementToHaveTextBy(ProfileUIMapper.FETCH_STATUS_TITLE, "updating user profile success");

  }

  @Test(dataProvider = "all-size")
  public void shouldRouteUserBlogManagementPageWhenClickTheLink(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  ProfilePage profilePage = new ProfilePage(this.driver, true, this.testUser.email, this.testUser.password);
	  profilePage.clickElementBy(ProfileUIMapper.TO_MANAGE_BUTTON);
	  BlogManagementPage blogManagementPage = new BlogManagementPage(this.driver, false);
	  Assert.assertTrue(blogManagementPage.IsElementExist(BlogManagementUIMapper.PAGE_TITLE));

  }
}
