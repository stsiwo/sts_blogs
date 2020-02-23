package main.java.page;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import main.java.uimapper.BaseUIMapper;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.io.FileHandler;

import com.github.javafaker.Faker;

class BasePage {
	
	public WebDriver driver;
	
	public static String baseUrl = "";
	
	public JavascriptExecutor jsExecutor;
	
	protected WebDriverWait wait;
	
	protected WebDriverWait shortWait;

	public TestUser testUser;
	
	class TestUser {

		String name;

		String email;

		String password;

		public TestUser(String name, String email, String password) {
			this.name = name;
			this.email = email;
			this.password = password;
		}

	}

	public BasePage(WebDriver driver) {
		// TODO Auto-generated constructor stub
		this.driver = driver;
		this.jsExecutor = (JavascriptExecutor) this.driver;
		// by setting ignore stale exception, all errors related to parallel testing has gone!!!!
		this.wait = (WebDriverWait) new WebDriverWait(this.driver, 30).ignoring(StaleElementReferenceException.class);
		// short wait. use if does not want to wait for a long time like above
		this.shortWait = (WebDriverWait) new WebDriverWait(this.driver, 5).ignoring(StaleElementReferenceException.class);
	}
	
	public boolean isTitleMatch(String title) {
		return this.driver.getTitle().equals(title);
	}
	
	public boolean isExistInPage(String text) {
		return this.driver.getPageSource().contains(text);
	}
	
	public void takeScreenshot(String fileName) {
		File scrFile = ((TakesScreenshot)this.driver).getScreenshotAs((OutputType.FILE));
		try {
			FileHandler.copy(scrFile, new File("/tmp/java-"+ fileName + ".png"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public boolean isScrollableBasedY() {
		return (Boolean) this.jsExecutor.executeScript("return (document.getElementById('root').scrollWidth - document.getElementById('root').clientWidth) > 16");
	}
	
	public void scrollToTop() {
		// don't confuse with scrollTo vs scrollBy
		this.jsExecutor.executeScript("window.scrollTo(0,0)");
	}
	
	public void scrollToBottom() {
		this.jsExecutor.executeScript("window.scrollBy(0,1000)");
	}
	
	public void scrollIntoBy(By locator) {
		WebElement element = this.driver.findElement(locator);
		this.jsExecutor.executeScript("arguments[0].scrollIntoView();", element);
	}
	
	public Alert switchToDialog() {
		return this.driver.switchTo().alert();
	}
	// remove wait_for_animation_finish
	
	public WebElement waitForElementBy(By locator) {
		return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
	}
	
	public void waitForElementToHaveTextBy(By locator, String text) {
		wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
	}

	public void waitForElementToBeVisibleBy(By locator) {
		wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
	}

	public void waitForElementToBeVisible(WebElement element) {
		wait.until(ExpectedConditions.visibilityOf(element));
	}

	public void waitForElementToBeInvisibleBy(By locator) {
		wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
	}

	public WebElement waitForElementToBeClickableBy(By locator) {
		return wait.until(ExpectedConditions.elementToBeClickable(locator));
	}
	
	public void waitAnimationEnd() {
		//this.driver.manage().timeouts().implicitlyWait(500, TimeUnit.MILLISECONDS);
		// implicitWait does not work and there is no built-in animation wait in selenium
		// so use Thread.sleep() to wait animation end. works like charm!!
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void enterTextInElementBy(By locator, String text, boolean clear) {
		WebElement element = this.driver.findElement(locator);
		// error: org.openqa.selenium.InvalidArgumentException: invalid argument: File not found : a
		// -> cause: try to enter into file input
		// use 'false' for 'clear' argument when deal with file input
		if (clear) {
			element.sendKeys(Keys.CONTROL + "a");
			element.sendKeys(Keys.DELETE);
		}
		
		element.sendKeys(text);
	}
	
	public List<WebElement> getListOfElementsBy(By locator) {
		List<WebElement> elements = this.wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator)); 
		return elements;
	}
	
	public String getTextOfElementBy(By locator) {
		return this.waitForElementBy(locator).getText();
	}

	public String getAttributeOfElementBy(By locator, String attribute) {
		return this.waitForElementBy(locator).getAttribute(attribute);
	}
	
	public WebElement clickElementBy(By locator, By waitingElementLocator) {
		WebElement element = this.waitForElementToBeClickableBy(locator);
		element.click();
		return this.waitForElementBy(waitingElementLocator);
	}

	public void clickElementBy(By locator) {
		WebElement element = this.waitForElementToBeClickableBy(locator);
		element.click();
	}
	
	/**
	 * does not use 'wait'. if need to wait and want to boolean value, use IsElementExistWithWait instead
	 * @param locator
	 * @return boolean 
	 */
	public boolean IsElementExist(By locator) {
		try {
			this.driver.findElement(locator);
			return true; 
		} catch (NoSuchElementException e) {
			return false;
		}
	}

	/**
	 * use 'wait' for 5 sec. 
	 * @param locator
	 * @return boolean 
	 */
	public boolean IsElementExistWithWait(By locator) {
		try {
			this.shortWait.until(ExpectedConditions.presenceOfElementLocated(locator));
			return true; 
		} catch (NoSuchElementException e) {
			return false;
		}
	}
	
	public void pressBy(By locator, Keys key) {
		WebElement element = this.waitForElementBy(locator);
		element.sendKeys(key);
	}

}
