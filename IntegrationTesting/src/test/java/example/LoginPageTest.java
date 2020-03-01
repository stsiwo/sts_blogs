package test.java.example;

import org.json.simple.JSONObject;
import org.openqa.selenium.Dimension;

import org.testng.Assert;
import org.testng.annotations.Test;

import main.java.base.Config;
import main.java.page.BlogListPage;
import main.java.page.HomePage;
import main.java.page.LoginPage;
import main.java.page.ResetPasswordPage;
import main.java.page.SignupPage;
import main.java.uimapper.HomeUIMapper;
import main.java.uimapper.LoginUIMapper;

public class LoginPageTest extends BaseTest {

  @Test(dataProvider = "all-size")
  public void shouldDisplayEmailInputEmptyValidationErrorWhenItIsFocused(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  LoginPage loginPage = new LoginPage(this.driver, true);
	  loginPage.clickElementBy(LoginUIMapper.EMAIL_INPUT);
	  
	  Assert.assertTrue(loginPage.isExistInPage("email is a required field"));
  }
  
  // add the other validation rule and test
  
  @Test(dataProvider = "all-size")
  public void shouldDisplayPasswordInputEmptyValidationErrorWhenItIsFocused(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  LoginPage loginPage = new LoginPage(this.driver, true);
	  loginPage.clickElementBy(LoginUIMapper.PASSWORD_INPUT);
	  
	  Assert.assertTrue(loginPage.isExistInPage("password is a required field"));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayConfirmInputEmptyValidationErrorWhenItIsFocused(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  LoginPage loginPage = new LoginPage(this.driver, true);
	  loginPage.clickElementBy(LoginUIMapper.CONFIRM_INPUT);
	  
	  Assert.assertTrue(loginPage.isExistInPage("confirm is a required field"));
  }

  @Test(dataProvider = "all-size")
  public void shouldNotAllowToSubmitWhenAtLeastOneError(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  LoginPage loginPage = new LoginPage(this.driver, true);
	  loginPage.clickElementBy(LoginUIMapper.CONFIRM_INPUT);
	  //loginPage.waitForElementBy(LoginUIMapper.CONFIRM_ERROR);
	  loginPage.clickElementBy(LoginUIMapper.SUBMIT_BUTTON);
	  
	  Assert.assertTrue(loginPage.isExistInPage("please fix validation errors before submit"));
  }

  @Test(dataProvider = "all-size")
  public void shouldRouteSignupPageWhenClickTheLink(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  LoginPage loginPage = new LoginPage(this.driver, true);
	  loginPage.clickElementBy(LoginUIMapper.SIGNUP_LINK);
	  SignupPage signupPage = new SignupPage(this.driver, false);
	  
	  Assert.assertTrue(signupPage.isExistInPage("Signup"));
  }
  
  
  @Test(dataProvider = "all-size")
  public void shouldRouteHomePageWhenSuccessfullyLogin(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  LoginPage loginPage = new LoginPage(this.driver, true);
	  loginPage.login(this.testUser.email, this.testUser.password, this.testUser.password);
	  
	  HomePage homePage = new HomePage(this.driver, false);
	  homePage.waitForElementBy(HomeUIMapper.SLOGAN);
	  
	  Assert.assertTrue(homePage.isExistInPage("Share Your Knowledge and Expand What You Can Do"));
	  
	  // don't forget logout: each test should be independent!!
	  homePage.headerComponent.logout();
	  
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayFetchErrorMessageWhenProvidedEmailDoesNotRegistered(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  LoginPage loginPage = new LoginPage(this.driver, true);
	  loginPage.login("email@doesnot.exists", this.testUser.password, this.testUser.password);
	  
	  loginPage.waitForElementBy(LoginUIMapper.FETCH_ERR_MSG);
	  
	  Assert.assertTrue(loginPage.isExistInPage("provided email is not found"));
  }

  @Test(dataProvider = "all-size")
  public void shouldDisplayFetchErrorMessageWhenProvidedPasswordIsInvalid(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  LoginPage loginPage = new LoginPage(this.driver, true);
	  loginPage.login(this.testUser.email, "invalid_password", "invalid_password");
	  
	  loginPage.waitForElementBy(LoginUIMapper.FETCH_ERR_MSG);
	  
	  Assert.assertTrue(loginPage.isExistInPage("entered password is invalid."));
  }

  @Test(dataProvider = "mobile")
  public void shouldDisplaySuccessMessageWhenForgotPasswordRequest(Dimension ssize) {
	  this.driver.manage().window().setSize(ssize);
	  
	  LoginPage loginPage = new LoginPage(this.driver, true);

    loginPage.clickForgotPasswordLinkAndWaitForModal();

    loginPage.fillForgotPasswordEmailInputBy(this.testUser.email);

    loginPage.submitForgotPasswordRequest();

    loginPage.takeScreenshot("forgot-password-reset");
    loginPage.waitForElementToHaveTextBy(LoginUIMapper.FETCHE_SUCCESS_STATUS, "requesting forgot password success. please check your email box.");

    String resetPasswordUrl = loginPage.tryUntilGetResetPasswordUrl(this.testUser.email, 5);

    this.driver.get(resetPasswordUrl);

    ResetPasswordPage rpPage = new ResetPasswordPage(this.driver, false);

    this.testUser.password = "my-new-password";

    rpPage.fillInputsBy(this.testUser.password, this.testUser.password);

    rpPage.submitResetPasswordForm();
	  
	  Assert.assertTrue(rpPage.isExistInPage("requesting reset password success"));
  }
}
