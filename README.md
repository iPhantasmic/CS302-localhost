# Bookings - Atomic Service

## Running locally
The Makefile specifies various recipes that aided us in development. The main flow needed to run the service locally at Port 50051 is to build and compose up. 

This can be achieved by running the following commands at the root of the repository:

`make build`
`make up`

This spins up the GRPC Service, along with a Postgres database and a PGAdmin GUI to administer said database.

To compose down:
`make down`

---
## About this service
This is a GRPC service written in python that interacts with the `booking` table in the database to implement CRUD operations for the creation of bookings. 

The submodule with all protofiles and stubs across services can be found in /app/services/pb

