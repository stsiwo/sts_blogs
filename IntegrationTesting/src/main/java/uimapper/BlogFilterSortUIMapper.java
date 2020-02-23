package main.java.uimapper;

import org.openqa.selenium.By;

public final class BlogFilterSortUIMapper {
	
    public final static By FILTER_SORT_ASIDE = By.cssSelector("aside[role='filter-sort-aside']");
    		  
    public final static By SORT_DATE_ASC_ICON = By.cssSelector("label[for='sort-0']");
      
    public final static By SORT_DATE_DESC_ICON = By.cssSelector("label[for='sort-1']");
      
    public final static By SORT_TITLE_ASC_ICON = By.cssSelector("label[for='sort-2']");
      
    public final static By SORT_TITLE_DESC_ICON = By.cssSelector("label[for='sort-3']");
      
    public final static By SORT_CLAP_ASC_ICON = By.cssSelector("label[for='sort-4']");
      
    public final static By SORT_CLAP_DESC_ICON = By.cssSelector("label[for='sort-5']");
      
    public final static By FILTER_KEYWORD_INPUT = By.cssSelector("input[id='keyword']");
      
    public final static By FILTER_START_DATE_INPUT = By.cssSelector("input[id='start-date-input']"); 
    
    public final static By FILTER_END_DATE_INPUT = By.cssSelector("input[id='end-date-input']");
      
    public final static By FILTER_TAG_INPUT = By.cssSelector("input[id='tag']");
      
    public final static By SETTING_ICON = By.cssSelector("div[role='setting-icon']");

    public final static By FILTER_SORT_CLOSE_ICON = By.cssSelector("div[role='filter-sort-icon']");
      
    public final static By REFRESH_ICON = By.cssSelector("div[role='refresh-icon']");
      
    public final static By LIMIT_SELECT = By.cssSelector("select[role='page-limit-select']");
      
    public final static By LIMIT_40_OPTION = By.cssSelector("option[value='40']");
    
    // className can't find this at Chrome & Firefox
    public final static By FETCH_STATUS_TITLE = By.cssSelector("h3[class='fetch-status-title']");
    
    public final static By PAGE_4_BTN = By.cssSelector("button[role='page-btn-4']");
  
    public final static By PAGE_FIRST_BTN = By.cssSelector("button[role='first-page-btn']");
  
    public final static By PAGE_LAST_BTN = By.cssSelector("button[role='last-page-btn']"); 
  
    public final static By BLOG_LIST_FETCHING = By.cssSelector("p[role='fetching']");

    public final static By BLOG_ITEM_TITLE = By.cssSelector("h2.blog-list-item-desc-title"); 

    public final static By BLOG_ITEM_CREATED_DATE = By.cssSelector("p.blog-list-item-desc-detail-date");

    public final static By BLOG_ITEM_CLAP = By.cssSelector("p.blog-list-item-desc-detail-clap");

    public final static By BLOG_ITEM_TAG = By.cssSelector("p.blog-list-item-desc-detail-tag");

    public final static By NO_SEARCH_RESULT_TITLE = By.cssSelector("p[role='no-search-result-title']");


}
