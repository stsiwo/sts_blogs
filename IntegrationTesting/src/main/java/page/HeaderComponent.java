package main.java.page;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

import main.java.uimapper.HeaderComponentUIMapper;

public class HeaderComponent extends BasePage {
	
	public HeaderComponent(WebDriver driver) {
		super(driver);
	}
	
	// programmatically logout
	public void logout() {
		this.driver.manage().window().maximize();
		this.waitAnimationEnd();
		if (this.IsElementExist(HeaderComponentUIMapper.LOGOUT_NAV_ITEM)) {
			this.driver.findElement(HeaderComponentUIMapper.LOGOUT_NAV_ITEM);
		}
	}
	
	public BlogListPage clickBlogListLink() {
		this.clickElementBy(HeaderComponentUIMapper.BLOGS_NAV_ITEM);
		return new BlogListPage(this.driver, false);
	}

	public SignupPage clickSignupLink() {
		this.clickElementBy(HeaderComponentUIMapper.SIGNUP_NAV_ITEM);
		return new SignupPage(this.driver, false);
	}

	public LoginPage clickLoginLink() {
		this.clickElementBy(HeaderComponentUIMapper.LOGIN_NAV_ITEM);
		return new LoginPage(this.driver, false);
	}

	public HomePage clickLogoutLink() {
		this.clickElementBy(HeaderComponentUIMapper.LOGOUT_NAV_ITEM);
		return new HomePage(this.driver, false);
	}

	public BlogListPage clickBlogListLinkThruNavSideBar() {
		this.clickElementBy(HeaderComponentUIMapper.MENU_TOGGLE_ICON, HeaderComponentUIMapper.BLOGS_NAV_ITEM);
		this.waitAnimationEnd();
		this.clickElementBy(HeaderComponentUIMapper.BLOGS_NAV_ITEM);
		return new BlogListPage(this.driver, false);
	}

	public SignupPage clickSignupLinkThruNavSideBar() {
		this.clickElementBy(HeaderComponentUIMapper.MENU_TOGGLE_ICON, HeaderComponentUIMapper.SIGNUP_NAV_ITEM);
		this.waitAnimationEnd();
		this.clickElementBy(HeaderComponentUIMapper.SIGNUP_NAV_ITEM);
		return new SignupPage(this.driver, false);
	}

	public LoginPage clickLoginLinkThruNavSideBar() {
		this.clickElementBy(HeaderComponentUIMapper.MENU_TOGGLE_ICON, HeaderComponentUIMapper.LOGIN_NAV_ITEM);
		this.waitAnimationEnd();
		this.clickElementBy(HeaderComponentUIMapper.LOGIN_NAV_ITEM);
		return new LoginPage(this.driver, false);
	}
	
	public HomePage clickLogoutLinkThruNavSideBar() {
		this.clickElementBy(HeaderComponentUIMapper.MENU_TOGGLE_ICON, HeaderComponentUIMapper.LOGOUT_NAV_ITEM);
		this.waitAnimationEnd();
		this.clickElementBy(HeaderComponentUIMapper.LOGOUT_NAV_ITEM);
		return new HomePage(this.driver, false);
	}
}
