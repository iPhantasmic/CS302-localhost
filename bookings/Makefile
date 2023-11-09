GIT_COMMIT=$(shell git rev-parse --verify HEAD)
PROJECT_NAME=bookings

.PHONY: build
build:
	docker build \
    --build-arg GIT_COMMIT=${GIT_COMMIT} \
	--platform linux/arm64 \
    -t $(PROJECT_NAME):latest \
    -t $(PROJECT_NAME):${GIT_COMMIT} \
    .

.PHONY: clean
clean:
	py.cleanup -p .

.PHONY: down
down:
	docker-compose down

.PHONY: install
install:
	pip install -r requirements/dev.txt

.PHONY: lint
lint:
	pre-commit run pylint --all-files

.PHONY: run-grpc-api
run-grpc-api:
	python -m app.apis.server

.PHONY: up
up:
	docker-compose up -d