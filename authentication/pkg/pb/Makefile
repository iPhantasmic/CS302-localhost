.PHONY: health
health:
	protoc ./health.proto --go_out=./health --go_opt=paths=source_relative --go-grpc_out=./health --go-grpc_opt=paths=source_relative
	python3 -m grpc.tools.protoc -I=./ --python_out=./health --grpc_python_out=./health health.proto
	protol --exclude-google-imports --in-place -o ./health protoc --proto-path=. ./health.proto

.PHONY: auth
auth:
	protoc ./auth.proto --go_out=./auth --go_opt=paths=source_relative --go-grpc_out=./auth --go-grpc_opt=paths=source_relative

.PHONY: bookings
bookings:
	python3 -m grpc.tools.protoc -I=./ --python_out=./bookings --grpc_python_out=./bookings ./bookings.proto
	protol --exclude-google-imports --in-place -o ./bookings protoc --proto-path=. ./bookings.proto

.PHONY: users
users:
	protoc ./users.proto --go_out=./users --go_opt=paths=source_relative --go-grpc_out=./users --go-grpc_opt=paths=source_relative

.PHONY: listings
listings:
	python3 -m grpc.tools.protoc -I=./ --python_out=./listings --grpc_python_out=./listings ./listings.proto
	protol --exclude-google-imports --in-place -o ./listings protoc --proto-path=. ./listings.proto

.PHONY: reviews
reviews:
	protoc ./reviews.proto --go_out=./reviews --go_opt=paths=source_relative --go-grpc_out=./reviews --go-grpc_opt=paths=source_relative
