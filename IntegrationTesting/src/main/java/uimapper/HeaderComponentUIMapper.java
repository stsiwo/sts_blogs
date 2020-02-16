package main.java.uimapper;

import org.openqa.selenium.By;

public final class HeaderComponentUIMapper {

    public final static By MENU = By.cssSelector("ul[role='menu']");

    public final static By MENU_TOGGLE_ICON = By.cssSelector("i[role='menu-toggle-icon']");

    public final static By MENU_CLOSE_ICON = By.cssSelector("div[role='menu-close-icon']");

    // className also cuase stuck at Firefox
    public final static By LOGO_TITLE = By.cssSelector("h1[class='header-title']");

    // when use linkText, sometime stuck at Chrome driver
    public final static By BLOGS_NAV_ITEM = By.cssSelector("a[href='/blogs']");

    // when use linkText, sometime stuck at Chrome driver
    public final static By SIGNUP_NAV_ITEM = By.cssSelector("a[href='/signup']");

    // when use linkText, sometime stuck at Chrome driver
    public final static By LOGIN_NAV_ITEM = By.cssSelector("a[href='/login']");

    // when use linkText, sometime stuck at Chrome driver
    public final static By ACCOUNT_NAV_ITEM = By.cssSelector("a[role='account-link']");

    // when use linkText, sometime stuck at Chrome driver
    public final static By LOGOUT_NAV_ITEM = By.cssSelector("a[role='logout-link']");

}
