GIT_COMMIT=$(shell git rev-parse --verify HEAD)
PROJECT_NAME=app

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

# Usage: make run-text-api ARGS="check_health"
# 			 make run-text-api ARGS="get_item 1"
.PHONY: run-grpc-api
run-grpc-api:
	python -m $(PROJECT_NAME).apis.grpc

.PHONY: up
up:
	docker-compose up -d