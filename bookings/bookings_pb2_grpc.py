# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from bookings import bookings_pb2 as bookings_dot_bookings__pb2


class BookingServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.CreateBooking = channel.unary_unary(
                '/BookingService/CreateBooking',
                request_serializer=bookings_dot_bookings__pb2.CreateBookingRequest.SerializeToString,
                response_deserializer=bookings_dot_bookings__pb2.Booking.FromString,
                )
        self.GetBookingByUser = channel.unary_unary(
                '/BookingService/GetBookingByUser',
                request_serializer=bookings_dot_bookings__pb2.BookingByUserRequest.SerializeToString,
                response_deserializer=bookings_dot_bookings__pb2.GetBookingArrayResponse.FromString,
                )
        self.GetBookingByListing = channel.unary_unary(
                '/BookingService/GetBookingByListing',
                request_serializer=bookings_dot_bookings__pb2.BookingByListingRequest.SerializeToString,
                response_deserializer=bookings_dot_bookings__pb2.GetBookingArrayResponse.FromString,
                )
        self.UpdateBookingById = channel.unary_unary(
                '/BookingService/UpdateBookingById',
                request_serializer=bookings_dot_bookings__pb2.UpdateBookingRequest.SerializeToString,
                response_deserializer=bookings_dot_bookings__pb2.ReturnMessage.FromString,
                )
        self.DeleteBookingByUserId = channel.unary_unary(
                '/BookingService/DeleteBookingByUserId',
                request_serializer=bookings_dot_bookings__pb2.BookingByUserRequest.SerializeToString,
                response_deserializer=bookings_dot_bookings__pb2.ReturnMessage.FromString,
                )
        self.DeleteBookingByListingId = channel.unary_unary(
                '/BookingService/DeleteBookingByListingId',
                request_serializer=bookings_dot_bookings__pb2.BookingByListingRequest.SerializeToString,
                response_deserializer=bookings_dot_bookings__pb2.ReturnMessage.FromString,
                )


class BookingServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def CreateBooking(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetBookingByUser(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetBookingByListing(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def UpdateBookingById(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DeleteBookingByUserId(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DeleteBookingByListingId(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_BookingServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'CreateBooking': grpc.unary_unary_rpc_method_handler(
                    servicer.CreateBooking,
                    request_deserializer=bookings_dot_bookings__pb2.CreateBookingRequest.FromString,
                    response_serializer=bookings_dot_bookings__pb2.Booking.SerializeToString,
            ),
            'GetBookingByUser': grpc.unary_unary_rpc_method_handler(
                    servicer.GetBookingByUser,
                    request_deserializer=bookings_dot_bookings__pb2.BookingByUserRequest.FromString,
                    response_serializer=bookings_dot_bookings__pb2.GetBookingArrayResponse.SerializeToString,
            ),
            'GetBookingByListing': grpc.unary_unary_rpc_method_handler(
                    servicer.GetBookingByListing,
                    request_deserializer=bookings_dot_bookings__pb2.BookingByListingRequest.FromString,
                    response_serializer=bookings_dot_bookings__pb2.GetBookingArrayResponse.SerializeToString,
            ),
            'UpdateBookingById': grpc.unary_unary_rpc_method_handler(
                    servicer.UpdateBookingById,
                    request_deserializer=bookings_dot_bookings__pb2.UpdateBookingRequest.FromString,
                    response_serializer=bookings_dot_bookings__pb2.ReturnMessage.SerializeToString,
            ),
            'DeleteBookingByUserId': grpc.unary_unary_rpc_method_handler(
                    servicer.DeleteBookingByUserId,
                    request_deserializer=bookings_dot_bookings__pb2.BookingByUserRequest.FromString,
                    response_serializer=bookings_dot_bookings__pb2.ReturnMessage.SerializeToString,
            ),
            'DeleteBookingByListingId': grpc.unary_unary_rpc_method_handler(
                    servicer.DeleteBookingByListingId,
                    request_deserializer=bookings_dot_bookings__pb2.BookingByListingRequest.FromString,
                    response_serializer=bookings_dot_bookings__pb2.ReturnMessage.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'BookingService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class BookingService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def CreateBooking(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/BookingService/CreateBooking',
            bookings_dot_bookings__pb2.CreateBookingRequest.SerializeToString,
            bookings_dot_bookings__pb2.Booking.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetBookingByUser(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/BookingService/GetBookingByUser',
            bookings_dot_bookings__pb2.BookingByUserRequest.SerializeToString,
            bookings_dot_bookings__pb2.GetBookingArrayResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetBookingByListing(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/BookingService/GetBookingByListing',
            bookings_dot_bookings__pb2.BookingByListingRequest.SerializeToString,
            bookings_dot_bookings__pb2.GetBookingArrayResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def UpdateBookingById(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/BookingService/UpdateBookingById',
            bookings_dot_bookings__pb2.UpdateBookingRequest.SerializeToString,
            bookings_dot_bookings__pb2.ReturnMessage.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DeleteBookingByUserId(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/BookingService/DeleteBookingByUserId',
            bookings_dot_bookings__pb2.BookingByUserRequest.SerializeToString,
            bookings_dot_bookings__pb2.ReturnMessage.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DeleteBookingByListingId(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/BookingService/DeleteBookingByListingId',
            bookings_dot_bookings__pb2.BookingByListingRequest.SerializeToString,
            bookings_dot_bookings__pb2.ReturnMessage.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
