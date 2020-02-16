package test.java.example;

import java.net.MalformedURLException;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.testng.Reporter;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.github.javafaker.Faker;

import main.java.base.Config;
import main.java.base.SetupTestDriver;
import main.java.page.HomePage;

public class BaseTest {

  public WebDriver driver;
  
  public final Dimension mobileSize = new Dimension(320, 1000);

  public final Dimension tabletSize = new Dimension(768, 1000);

  public final Dimension laptopSize = new Dimension(1024, 1000);

  public final Dimension desktopSize = new Dimension(1440, 1000);

  public final Faker faker = new Faker();
  
  public TestUser testUser;
  
  public SetupTestDriver setup;
  
  public class TestUser {
	  
	  public String name;
	  public String email;
	  public String password;
	  
	  public TestUser(String name, String email, String password) {
		// TODO Auto-generated constructor stub
		this.name = name;
		this.email = email;
		this.password = password;
	}
  }
  
  @BeforeClass(alwaysRun = true)
  @Parameters({"os", "browser", "url", "node", "testUserName", "testUserEmail", "testUserPassword"})
  public void beforeClass(String os, String browser, String url, String node, String testUserName, String testUserEmail, String testUserPassword) throws MalformedURLException {
	  Reporter.log( "Before Class \n", true );
	  System.out.printf("os: %s, browser %s, Thread.id: %s \n", os, browser, Thread.currentThread().getId());
	  this.setup = new SetupTestDriver(os, browser, url, node);
	  this.testUser = new TestUser(testUserName, testUserEmail, testUserPassword);
	  System.out.printf("test user info: name=%s email=%s password=%s \n", testUser.name,  testUser.email, testUser.password);
      this.driver = this.setup.getDriver();
      // logout if logined already
      this.driver.get(HomePage.url);
	  HomePage homePage = new HomePage(this.driver, false);
	  homePage.headerComponent.logout();      
  }
  
  @DataProvider(name = "mobile")
  public Object[][] mobileDataProviderMethod() {
      return new Object[][] { { this.mobileSize } };
  }

  @DataProvider(name = "lte-tablet")
  public Object[][] lteTabletDataProviderMethod() {
      return new Object[][] { 
    	  { this.mobileSize },
    	  { this.tabletSize } 
    	  };
  }
  
  @DataProvider(name = "lte-laptop")
  public Object[][] lteLaptopDataProviderMethod() {
      return new Object[][] { 
    	  { this.mobileSize },
    	  { this.tabletSize }, 
    	  { this.laptopSize }
    	  };
  }

  @DataProvider(name = "all-size")
  public Object[][] allSizeDataProviderMethod() {
      return new Object[][] { 
    	  { this.mobileSize },
    	  { this.tabletSize }, 
    	  { this.laptopSize },
    	  { this.desktopSize }
    	  };
  }

  @DataProvider(name = "gte-laptop")
  public Object[][] gteLaptopDataProviderMethod() {
      return new Object[][] { 
    	  { this.laptopSize },
    	  { this.desktopSize }
    	  };
  }

  @DataProvider(name = "gte-tablet")
  public Object[][] gteTabletDataProviderMethod() {
      return new Object[][] { 
    	  { this.tabletSize },
    	  { this.laptopSize },
    	  { this.desktopSize }
    	  };
  }

  @DataProvider(name = "laptop")
  public Object[][] laptopDataProviderMethod() {
      return new Object[][] { 
    	  { this.laptopSize }
    	  };
  }

  @DataProvider(name = "desktop")
  public Object[][] desktopDataProviderMethod() {
      return new Object[][] { 
    	  { this.desktopSize }
    	  };
  }

  @AfterClass(alwaysRun = true)
  public void afterClass() {
	  Reporter.log( "After Class", true );
	  this.driver.quit();
  }
}
