FROM python:3.10-slim
WORKDIR /usr
COPY requirements.test.txt ./
COPY tests/*.py ./tests/
COPY ./wait-for-it.sh .
RUN pip install --no-cache-dir -r requirements.test.txt
RUN chmod +x wait-for-it.sh
CMD ./wait-for-it.sh selenium:4444 -- python tests/*.py
