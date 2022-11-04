from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver import ChromeOptions



options = ChromeOptions()
chrome_driver = webdriver.Remote("http://selenium:4444/wd/hub", options=options)
chrome_driver.get('https://cs302-ui.vercel.app/')

title = "Localhost - Rent safely"
assert title == chrome_driver.title
print("Passed!")
chrome_driver.close()
chrome_driver.quit()