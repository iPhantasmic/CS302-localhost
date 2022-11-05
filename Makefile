GIT_COMMIT=$(shell git rev-parse --verify HEAD)
PROJECT_NAME=reviews

.PHONY: proto
proto:
	protoc pkg/pb/reviews/*.proto --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative

.PHONY: server
server:
	go run cmd/main.go

.PHONY: build
build:
	docker build \
    --build-arg GIT_COMMIT=${GIT_COMMIT} \
	--platform linux/amd64 \
    -t $(PROJECT_NAME):latest \
    -t $(PROJECT_NAME):${GIT_COMMIT} \
    .

.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: test_local
test_local:
	go test -v ./ci

.PHONY: test_docker
test_docker:
	docker compose -f ci/docker-compose.test.yml up --exit-code-from reviews_test --build
