FROM python:3.10

# Ensure that Python outputs everything that's printed inside
# the application rather than buffering it.
ENV PYTHONUNBUFFERED 1

# Add dockerize, which will add a command we can use to wait for
# dependent containers to finish setup (instead of just startup)
RUN apt-get update && apt-get install -y wget

# For M1 Macs
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-armhf-v0.6.1.tar.gz
RUN tar -C /usr/local/bin -xzvf dockerize-linux-armhf-v0.6.1.tar.gz

# For Intel Machines
# RUN wget https://github.com/jwilder/dockerize/releases/download/v0.1.0/dockerize-linux-amd64-v0.1.0.tar.gz
# RUN tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.1.0.tar.gz

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

# Server and clients are run from same container
# so rely on docker compose to determine command
CMD []