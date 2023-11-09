FROM golang:buster

WORKDIR $GOPATH/test
COPY . .

# Fetch dependencies
RUN go mod download
RUN chmod +x ./wait-for-it.sh

# Run tests
CMD ./wait-for-it.sh listing_service:50051 -- go test -count=1 -v ./tests