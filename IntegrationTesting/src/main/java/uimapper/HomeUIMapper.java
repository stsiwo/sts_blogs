package main.java.uimapper;

import org.openqa.selenium.By;

public final class HomeUIMapper extends BaseUIMapper {
	
	public final static By SEARCH_BUTTON = By.cssSelector("div[role='search-icon']");

	public final static By SEARCH_INPUT = By.cssSelector("input[role='search-input']");
	
	public final static By JOIN_BUTTON = By.xpath("//*[contains(text(), 'Join')]");
	
	public final static By TO_MANAGE_BUTTON = By.xpath("//*[contains(text(), 'To Manage')]");
	
	public final static By BLOG_ITEM_TITLE = By.cssSelector("h2.blog-list-item-desc-title");
	
	public final static By POPULAR_BUTTON = By.xpath("//*[contains(text(), 'Popular')]");
	
	public final static By SLOGAN = By.cssSelector("h1.home-slogan");

	public final static By BLOG_ITEM = By.cssSelector("a[role='blog-item']");
	

}
