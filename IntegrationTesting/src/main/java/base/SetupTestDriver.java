package main.java.base;

import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.ie.InternetExplorerOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

public class SetupTestDriver {
	private WebDriver driver = null;
    private String browser = null;
    private String baseUrl = null;
    private String os = null;
    private String node = null;

    public SetupTestDriver(String os, String browser, String baseUrl, String node) throws MalformedURLException {
        this.browser = browser;
        this.os = os;
        this.baseUrl = baseUrl;
        this.node = node;

        //Platform platform = Platform.fromString(os.toUpperCase());
        // currently only support Linux platform due to the use of Docker Selenium Grid.
        //Platform platform = Platform.fromString(os.toUpperCase());
        if(browser.equalsIgnoreCase("chrome")) {

            ChromeOptions chromeOptions = new ChromeOptions();
            //chromeOptions.addArguments("--headless"); // hide browser during test
            DesiredCapabilities capabilities = new DesiredCapabilities().chrome();
            capabilities.setCapability("platform", Platform.LINUX);
            capabilities.setCapability(ChromeOptions.CAPABILITY, chromeOptions);
            this.driver = new RemoteWebDriver(new URL(node + "/wd/hub"), capabilities);
        } else if (browser.equalsIgnoreCase("firefox")) {
            FirefoxOptions firefoxOptions = new FirefoxOptions();
            //firefoxOptions.addArguments("--headless"); // hide browser during test
            DesiredCapabilities capabilities = new DesiredCapabilities().firefox();
            capabilities.setCapability("platform", Platform.LINUX);
            capabilities.setCapability(FirefoxOptions.FIREFOX_OPTIONS, firefoxOptions);
            this.driver = new RemoteWebDriver(new URL(node + "/wd/hub"), capabilities);
        } else {
            //InternetExplorerOptions ieOption = new InternetExplorerOptions();
            //ieOption.setCapability("platform", platform);
            //this.driver = new RemoteWebDriver(new URL(node + "/wd/hub"), ieOption);
        }

        this.driver.get(baseUrl);

    }

    public String getOs() {
        return this.os;
    }

    public String getBrowser() {
        return this.browser;
    }

    public String getBaseUrl() {
        return this.baseUrl;
    }

    public String getNode() {
        return this.node;
    }

    public WebDriver getDriver() {
        return this.driver;
    }
}
