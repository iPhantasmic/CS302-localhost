FROM python:3.10-slim

# Ensure that Python outputs everything that's printed inside
# the application rather than buffering it.
ENV PYTHONUNBUFFERED 1

# Add dockerize, which will add a command we can use to wait for
# dependent containers to finish setup (instead of just startup)
RUN apt-get update && apt-get install -y libpq-dev gcc make git

RUN mkdir /opt/app/
WORKDIR /opt/app/

ARG GIT_COMMIT
ENV GIT_COMMIT $GIT_COMMIT

# Docker caches packages so that this line is only re-run
# when requirements change
ADD ./*.txt /opt/app/
RUN pip install -r requirements.txt

COPY . /opt/app

RUN chmod +x scripts/run-grpc-api.sh
RUN chmod +x scripts/wait-for-it.sh

CMD ./scripts/wait-for-it.sh $DB_HOST:$DB_PORT -- ./scripts/run-grpc-api.sh
