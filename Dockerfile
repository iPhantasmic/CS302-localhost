# build
FROM golang:alpine as build

# Install git.
# Git is required for fetching the dependencies.
RUN apk add --no-cache git

WORKDIR $GOPATH/src/rpc/
COPY . .

# Fetch dependencies
RUN go mod download

# Build the gRPC service binary
RUN go build -o /reviewService ./cmd


# final build
FROM alpine:3.11.3

RUN apk --no-cache add bash wget ca-certificates
RUN apk update

WORKDIR /

COPY --from=build /go/src/rpc/wait-for-it.sh .
COPY --from=build /reviewService .
COPY --from=build /go/src/rpc/pkg/config/envs/ ./pkg/config/envs/

RUN chmod +x wait-for-it.sh

EXPOSE 50051

CMD ./wait-for-it.sh $DB_HOST:$DB_PORT -- bash -c /reviewService
#ENTRYPOINT ["bash", "-c", "/reviewService"]
