import pytest
import requests
from selenium import webdriver
import sys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from time import sleep

@pytest.mark.dependency()
def test_function():
    x = requests.get("https://cs302-ui.vercel.app/")
    assert x.status_code == 200

def test_title_app():
    chrome_driver = webdriver.Chrome()
    
    chrome_driver.get('https://cs302-ui.vercel.app/')
    chrome_driver.maximize_window()
 
    title = "Localhost - Rent safely"
    assert title == chrome_driver.title