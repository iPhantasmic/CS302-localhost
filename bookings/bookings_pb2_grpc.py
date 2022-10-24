import grpc
from . import bookings_pb2 as bookings__pb2

class BookingServiceStub(object):
    pass

    def __init__(self, channel):
        """Constructor.

    Args:
      channel: A grpc.Channel.
    """
        self.CreateBooking = channel.unary_unary('/bookings.BookingService/CreateBooking', request_serializer=bookings__pb2.CreateBookingRequest.SerializeToString, response_deserializer=bookings__pb2.Booking.FromString)
        self.GetBookingByUser = channel.unary_unary('/bookings.BookingService/GetBookingByUser', request_serializer=bookings__pb2.BookingByUserRequest.SerializeToString, response_deserializer=bookings__pb2.GetBookingArrayResponse.FromString)
        self.GetBookingByListing = channel.unary_unary('/bookings.BookingService/GetBookingByListing', request_serializer=bookings__pb2.BookingByListingRequest.SerializeToString, response_deserializer=bookings__pb2.GetBookingArrayResponse.FromString)
        self.UpdateBookingById = channel.unary_unary('/bookings.BookingService/UpdateBookingById', request_serializer=bookings__pb2.UpdateBookingRequest.SerializeToString, response_deserializer=bookings__pb2.ReturnMessage.FromString)
        self.DeleteBookingByUserId = channel.unary_unary('/bookings.BookingService/DeleteBookingByUserId', request_serializer=bookings__pb2.BookingByUserRequest.SerializeToString, response_deserializer=bookings__pb2.ReturnMessage.FromString)
        self.DeleteBookingByListingId = channel.unary_unary('/bookings.BookingService/DeleteBookingByListingId', request_serializer=bookings__pb2.BookingByListingRequest.SerializeToString, response_deserializer=bookings__pb2.ReturnMessage.FromString)
        self.GetAvailableListings = channel.unary_unary('/bookings.BookingService/GetAvailableListings', request_serializer=bookings__pb2.GetAvailableListingsRequest.SerializeToString, response_deserializer=bookings__pb2.GetAvailableListingsResponse.FromString)

class BookingServiceServicer(object):
    pass

    def CreateBooking(self, request, context):
        pass
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetBookingByUser(self, request, context):
        pass
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetBookingByListing(self, request, context):
        pass
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def UpdateBookingById(self, request, context):
        pass
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DeleteBookingByUserId(self, request, context):
        pass
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DeleteBookingByListingId(self, request, context):
        pass
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetAvailableListings(self, request, context):
        pass
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

def add_BookingServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {'CreateBooking': grpc.unary_unary_rpc_method_handler(servicer.CreateBooking, request_deserializer=bookings__pb2.CreateBookingRequest.FromString, response_serializer=bookings__pb2.Booking.SerializeToString), 'GetBookingByUser': grpc.unary_unary_rpc_method_handler(servicer.GetBookingByUser, request_deserializer=bookings__pb2.BookingByUserRequest.FromString, response_serializer=bookings__pb2.GetBookingArrayResponse.SerializeToString), 'GetBookingByListing': grpc.unary_unary_rpc_method_handler(servicer.GetBookingByListing, request_deserializer=bookings__pb2.BookingByListingRequest.FromString, response_serializer=bookings__pb2.GetBookingArrayResponse.SerializeToString), 'UpdateBookingById': grpc.unary_unary_rpc_method_handler(servicer.UpdateBookingById, request_deserializer=bookings__pb2.UpdateBookingRequest.FromString, response_serializer=bookings__pb2.ReturnMessage.SerializeToString), 'DeleteBookingByUserId': grpc.unary_unary_rpc_method_handler(servicer.DeleteBookingByUserId, request_deserializer=bookings__pb2.BookingByUserRequest.FromString, response_serializer=bookings__pb2.ReturnMessage.SerializeToString), 'DeleteBookingByListingId': grpc.unary_unary_rpc_method_handler(servicer.DeleteBookingByListingId, request_deserializer=bookings__pb2.BookingByListingRequest.FromString, response_serializer=bookings__pb2.ReturnMessage.SerializeToString), 'GetAvailableListings': grpc.unary_unary_rpc_method_handler(servicer.GetAvailableListings, request_deserializer=bookings__pb2.GetAvailableListingsRequest.FromString, response_serializer=bookings__pb2.GetAvailableListingsResponse.SerializeToString)}
    generic_handler = grpc.method_handlers_generic_handler('bookings.BookingService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))