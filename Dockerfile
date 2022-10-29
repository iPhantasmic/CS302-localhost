
############################
# STEP 1 build executable binary
############################

FROM golang:alpine as builder

# Install git.
# Git is required for fetching the dependencies.
RUN apk add --no-cache git

WORKDIR $GOPATH/src/rpc/
COPY . .

# Fetch dependencies
RUN go mod tidy

# Build the binary. for grpc gateway
RUN go build ./cmd

RUN pwd
RUN echo $GOPATH

#EXPOSE 9090
# Run the hello binary.

# final build
FROM alpine:3.11.3
RUN apk --no-cache add bash curl ca-certificates
RUN apk update
WORKDIR /root/
COPY --from=builder /go/src .
ENTRYPOINT ["./cmd"]

# ENTRYPOINT ["bash", "-c", "/root/server -grpc-port=$grpc_port_env -db-host=$db_host -db-user=$db_user -db-password=$db_password -db-schema=$db_schema"]