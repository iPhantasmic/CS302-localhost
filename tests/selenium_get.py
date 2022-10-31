from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
chrome_driver = webdriver.Remote("http://selenium:4444/wd/hub", desired_capabilities=DesiredCapabilities.CHROME)
chrome_driver.get('https://cs302-ui.vercel.app/')

title = "Localhost - Rent safely"
assert title == chrome_driver.title
chrome_driver.close()
chrome_driver.quit()