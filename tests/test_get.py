import pytest
import requests

@pytest.mark.dependency()
def test_function():
    x = requests.get("https://cs302-ui.vercel.app/")
    assert x.status_code == 200