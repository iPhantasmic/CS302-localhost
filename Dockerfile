FROM python:3.10-slim
WORKDIR /usr
COPY requirements.test.txt ./
COPY tests/*.py ./tests/
RUN pip install --no-cache-dir -r requirements.test.txt
CMD python -m pytest
