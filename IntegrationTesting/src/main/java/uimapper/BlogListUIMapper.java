package main.java.uimapper;

import org.openqa.selenium.By;

public final class BlogListUIMapper {

    public final static By PAGE_TITLE = By.cssSelector("h2[class='page-title']");

    public final static By JOIN_BUTTON = By.cssSelector("button[role='join-link']");

	public final static By BLOG_ITEM_TITLE = By.cssSelector("h2[class='blog-list-item-desc-title']");

    public final static By BLOG_ITEM = By.cssSelector("a[role='blog-item']");

}
