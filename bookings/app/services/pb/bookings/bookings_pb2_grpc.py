"""Client and server classes corresponding to protobuf-defined services."""
import grpc
from . import bookings_pb2 as bookings__pb2

class BookingServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.CreateBooking = channel.unary_unary('/bookings.BookingService/CreateBooking', request_serializer=bookings__pb2.CreateBookingRequest.SerializeToString, response_deserializer=bookings__pb2.Booking.FromString)
        self.GetBookingById = channel.unary_unary('/bookings.BookingService/GetBookingById', request_serializer=bookings__pb2.BookingByIdRequest.SerializeToString, response_deserializer=bookings__pb2.Booking.FromString)
        self.GetBookingByUser = channel.unary_unary('/bookings.BookingService/GetBookingByUser', request_serializer=bookings__pb2.BookingByUserRequest.SerializeToString, response_deserializer=bookings__pb2.GetBookingArrayResponse.FromString)
        self.GetBookingByListing = channel.unary_unary('/bookings.BookingService/GetBookingByListing', request_serializer=bookings__pb2.BookingByListingRequest.SerializeToString, response_deserializer=bookings__pb2.GetBookingArrayResponse.FromString)
        self.UpdateBookingById = channel.unary_unary('/bookings.BookingService/UpdateBookingById', request_serializer=bookings__pb2.UpdateBookingRequest.SerializeToString, response_deserializer=bookings__pb2.ReturnMessage.FromString)
        self.DeleteBookingByUserId = channel.unary_unary('/bookings.BookingService/DeleteBookingByUserId', request_serializer=bookings__pb2.BookingByUserRequest.SerializeToString, response_deserializer=bookings__pb2.ReturnMessage.FromString)
        self.DeleteBookingByListingId = channel.unary_unary('/bookings.BookingService/DeleteBookingByListingId', request_serializer=bookings__pb2.BookingByListingRequest.SerializeToString, response_deserializer=bookings__pb2.ReturnMessage.FromString)
        self.DeleteBookingById = channel.unary_unary('/bookings.BookingService/DeleteBookingById', request_serializer=bookings__pb2.BookingByIdRequest.SerializeToString, response_deserializer=bookings__pb2.ReturnMessage.FromString)
        self.GetUnavailableListings = channel.unary_unary('/bookings.BookingService/GetUnavailableListings', request_serializer=bookings__pb2.GetUnavailableListingsRequest.SerializeToString, response_deserializer=bookings__pb2.GetUnavailableListingsResponse.FromString)

class BookingServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def CreateBooking(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetBookingById(self, request, context):
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

    def DeleteBookingById(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetUnavailableListings(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

def add_BookingServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {'CreateBooking': grpc.unary_unary_rpc_method_handler(servicer.CreateBooking, request_deserializer=bookings__pb2.CreateBookingRequest.FromString, response_serializer=bookings__pb2.Booking.SerializeToString), 'GetBookingById': grpc.unary_unary_rpc_method_handler(servicer.GetBookingById, request_deserializer=bookings__pb2.BookingByIdRequest.FromString, response_serializer=bookings__pb2.Booking.SerializeToString), 'GetBookingByUser': grpc.unary_unary_rpc_method_handler(servicer.GetBookingByUser, request_deserializer=bookings__pb2.BookingByUserRequest.FromString, response_serializer=bookings__pb2.GetBookingArrayResponse.SerializeToString), 'GetBookingByListing': grpc.unary_unary_rpc_method_handler(servicer.GetBookingByListing, request_deserializer=bookings__pb2.BookingByListingRequest.FromString, response_serializer=bookings__pb2.GetBookingArrayResponse.SerializeToString), 'UpdateBookingById': grpc.unary_unary_rpc_method_handler(servicer.UpdateBookingById, request_deserializer=bookings__pb2.UpdateBookingRequest.FromString, response_serializer=bookings__pb2.ReturnMessage.SerializeToString), 'DeleteBookingByUserId': grpc.unary_unary_rpc_method_handler(servicer.DeleteBookingByUserId, request_deserializer=bookings__pb2.BookingByUserRequest.FromString, response_serializer=bookings__pb2.ReturnMessage.SerializeToString), 'DeleteBookingByListingId': grpc.unary_unary_rpc_method_handler(servicer.DeleteBookingByListingId, request_deserializer=bookings__pb2.BookingByListingRequest.FromString, response_serializer=bookings__pb2.ReturnMessage.SerializeToString), 'DeleteBookingById': grpc.unary_unary_rpc_method_handler(servicer.DeleteBookingById, request_deserializer=bookings__pb2.BookingByIdRequest.FromString, response_serializer=bookings__pb2.ReturnMessage.SerializeToString), 'GetUnavailableListings': grpc.unary_unary_rpc_method_handler(servicer.GetUnavailableListings, request_deserializer=bookings__pb2.GetUnavailableListingsRequest.FromString, response_serializer=bookings__pb2.GetUnavailableListingsResponse.SerializeToString)}
    generic_handler = grpc.method_handlers_generic_handler('bookings.BookingService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))

class BookingService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def CreateBooking(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bookings.BookingService/CreateBooking', bookings__pb2.CreateBookingRequest.SerializeToString, bookings__pb2.Booking.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetBookingById(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bookings.BookingService/GetBookingById', bookings__pb2.BookingByIdRequest.SerializeToString, bookings__pb2.Booking.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetBookingByUser(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bookings.BookingService/GetBookingByUser', bookings__pb2.BookingByUserRequest.SerializeToString, bookings__pb2.GetBookingArrayResponse.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetBookingByListing(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bookings.BookingService/GetBookingByListing', bookings__pb2.BookingByListingRequest.SerializeToString, bookings__pb2.GetBookingArrayResponse.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def UpdateBookingById(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bookings.BookingService/UpdateBookingById', bookings__pb2.UpdateBookingRequest.SerializeToString, bookings__pb2.ReturnMessage.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DeleteBookingByUserId(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bookings.BookingService/DeleteBookingByUserId', bookings__pb2.BookingByUserRequest.SerializeToString, bookings__pb2.ReturnMessage.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DeleteBookingByListingId(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bookings.BookingService/DeleteBookingByListingId', bookings__pb2.BookingByListingRequest.SerializeToString, bookings__pb2.ReturnMessage.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DeleteBookingById(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bookings.BookingService/DeleteBookingById', bookings__pb2.BookingByIdRequest.SerializeToString, bookings__pb2.ReturnMessage.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetUnavailableListings(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bookings.BookingService/GetUnavailableListings', bookings__pb2.GetUnavailableListingsRequest.SerializeToString, bookings__pb2.GetUnavailableListingsResponse.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)