package test.java.example;

import org.json.simple.JSONObject;
import org.openqa.selenium.Dimension;

import org.testng.Assert;
import org.testng.annotations.Test;

import main.java.base.Config;
import main.java.page.BlogListPage;
import main.java.page.HomePage;
import main.java.page.LoginPage;
import main.java.page.SignupPage;
import main.java.page.SignupPage;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.SignupUIMapper;

public class SignupPageTest extends BaseTest {

  @Test(dataProvider = "all-size")
  public void shouldNotDisplayAnyValidationErrorMessageWhenInitialLoad(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  SignupPage signupPage = new SignupPage(this.driver, true);
	  
	  Assert.assertFalse(signupPage.IsElementExist(SignupUIMapper.NAME_ERROR));
	  Assert.assertFalse(signupPage.IsElementExist(SignupUIMapper.SUMMARY_ERROR));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayNameInputEmptyValidationErrorWhenItIsFocused(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  SignupPage signupPage = new SignupPage(this.driver, true);
	  signupPage.clickElementBy(SignupUIMapper.NAME_INPUT);
	  
	  Assert.assertTrue(signupPage.isExistInPage("name is a required field"));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayEmailInputEmptyValidationErrorWhenItIsFocused(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  SignupPage signupPage = new SignupPage(this.driver, true);
	  signupPage.clickElementBy(SignupUIMapper.EMAIL_INPUT);
	  
	  Assert.assertTrue(signupPage.isExistInPage("email is a required field"));
  }
  
  // add the other validation rule and test
  
  @Test(dataProvider = "all-size")
  public void shouldDisplayPasswordInputEmptyValidationErrorWhenItIsFocused(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  SignupPage signupPage = new SignupPage(this.driver, true);
	  signupPage.clickElementBy(SignupUIMapper.PASSWORD_INPUT);
	  
	  Assert.assertTrue(signupPage.isExistInPage("password is a required field"));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayConfirmInputEmptyValidationErrorWhenItIsFocused(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  SignupPage signupPage = new SignupPage(this.driver, true);
	  signupPage.clickElementBy(SignupUIMapper.CONFIRM_INPUT);
	  
	  Assert.assertTrue(signupPage.isExistInPage("confirm is a required field"));
  }

  @Test(dataProvider = "all-size")
  public void shouldNotAllowToSubmitWhenAtLeastOneError(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  SignupPage signupPage = new SignupPage(this.driver, true);
	  signupPage.clickElementBy(SignupUIMapper.CONFIRM_INPUT);
	  ///signupPage.waitForElementBy(SignupUIMapper.CONFIRM_ERROR);
	  signupPage.clickElementBy(SignupUIMapper.SUBMIT_BUTTON);
	  
	  Assert.assertTrue(signupPage.isExistInPage("please fix validation errors before submit"));
  }
  
  @Test(dataProvider = "all-size")
  public void shouldRouteLoginPageWhenClickTheLink(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  SignupPage signupPage = new SignupPage(this.driver, true);
	  signupPage.clickElementBy(SignupUIMapper.LOGIN_LINK);
	  LoginPage loginPage = new LoginPage(this.driver, false);
	  
	  Assert.assertTrue(loginPage.isExistInPage("Login"));
  }
  
  @Test(dataProvider = "all-size")
  public void shouldRouteHomePageWhenSuccessfullySignup(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  SignupPage signupPage = new SignupPage(this.driver, true);
	  signupPage.signup(this.faker.name().name(), this.faker.internet().emailAddress(), "new_password");
	  
	  HomePage homePage = new HomePage(this.driver, false);
	  homePage.waitForElementBy(HomeUIMapper.SLOGAN);
	  
	  Assert.assertTrue(homePage.isExistInPage("Share Your Knowledge and Expand What You Can Do"));
	  
	  // don't foreget logout after assert
	  homePage.headerComponent.logout();
  }
  
  @Test(dataProvider = "all-size")
  public void shouldDisplayUserAlreadyExistMessageWhenEmailAlreadyExist(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  SignupPage signupPage = new SignupPage(this.driver, true);
	  signupPage.signup(this.testUser.name, this.testUser.email, this.testUser.password);
	  
	  signupPage.waitForElementBy(SignupUIMapper.FETCH_ERR_MSG);
	  
	  Assert.assertTrue(signupPage.isExistInPage("provided email already exists."));
  }
}
