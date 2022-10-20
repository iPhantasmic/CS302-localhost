"""grpc server."""

import os
import time
import logging
from concurrent import futures
import grpc
from app.services.protobuf_schemas.bookings import bookings_pb2_grpc
from app.services.protobuf_schemas.health import health_pb2, health_pb2_grpc
from app.services.implementations import (
    BookingServicer, HealthServicer)

_ONE_DAY_IN_SECONDS = 60 * 60 * 24
logging.basicConfig(level=logging.INFO)


def serve():
    """Start grpc server servicing FMS RPCs."""
    # create grpc server
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    # add services
    booking_services = BookingServicer()
    health_servicer = HealthServicer()

    bookings_pb2_grpc.add_BookingServicer_to_server(booking_services,
                                               server)
    health_pb2_grpc.add_HealthServicer_to_server(health_servicer, server)

    # start server
    address = '%s:%s' % (os.environ['HOST'], os.environ['PORT'])
    logging.info('Starting grpc server at %s', address)

    server.add_insecure_port(address)
    server.start()

    # mark server as healthy
    health_servicer.set('Bookings', health_pb2.HealthCheckResponse.SERVING)
    logging.info('grpc listening at %s', address)

    # start() does not block so sleep-loop
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve()