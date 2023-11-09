from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver import ChromeOptions



options = ChromeOptions()
options.add_argument("--no-sandbox"); 
options.add_argument("start-maximized"); 
options.add_argument("disable-infobars");
options.add_argument("--disable-extensions"); 
options.add_argument("--disable-gpu");
options.add_argument("--disable-dev-shm-usage");
options.add_argument("--remote-debugging-port=9222")
options.binary_location="/usr/bin/google-chrome"
chrome_driver = webdriver.Remote("http://selenium:4444/wd/hub", options=options)
chrome_driver.get('https://cs302-ui.vercel.app/')

title = "Localhost - Rent safely"
assert title == chrome_driver.title
print("Passed!")
chrome_driver.close()
chrome_driver.quit()