import pytest
import requests
from time import sleep

# from selenium import webdriver
# from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

@pytest.mark.dependency()
def test_function():
    x = requests.get("https://cs302-ui.vercel.app/")
    assert x.status_code == 200

@pytest.mark.dependency()
def test_title_app(selenium):

    sleep(2)
    # chrome_driver = webdriver.Remote("http://localhost:4444/wd/hub", desired_capabilities=DesiredCapabilities.CHROME)
        
    # chrome_driver.get('https://cs302-ui.vercel.app/')
    selenium.get('https://cs302-ui.vercel.app/')
    sleep(2)
    # chrome_driver.maximize_window()
    # chrome_driver.save_screenshot("screenshot.png")
    title = "Localhost - Rent safely"
    assert title == selenium.title

# if __name__ == "__main__":
#     test_title_app()