"""Client and server classes corresponding to protobuf-defined services."""
import grpc
from . import listings_pb2 as listings__pb2

class ListingServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.CreateListing = channel.unary_unary('/listings.ListingService/CreateListing', request_serializer=listings__pb2.CreateListingRequest.SerializeToString, response_deserializer=listings__pb2.Listing.FromString)
        self.GetBookingByCity = channel.unary_unary('/listings.ListingService/GetBookingByCity', request_serializer=listings__pb2.ListingByCityRequest.SerializeToString, response_deserializer=listings__pb2.GetListingArrayResponse.FromString)
        self.UpdateListingById = channel.unary_unary('/listings.ListingService/UpdateListingById', request_serializer=listings__pb2.Listing.SerializeToString, response_deserializer=listings__pb2.ReturnMessage.FromString)
        self.DeleteListingByListingId = channel.unary_unary('/listings.ListingService/DeleteListingByListingId', request_serializer=listings__pb2.BookingByListingRequest.SerializeToString, response_deserializer=listings__pb2.ReturnMessage.FromString)
        self.DeleteBookingByHostId = channel.unary_unary('/listings.ListingService/DeleteBookingByHostId', request_serializer=listings__pb2.BookingByHostRequest.SerializeToString, response_deserializer=listings__pb2.ReturnMessage.FromString)

class ListingServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def CreateListing(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetBookingByCity(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def UpdateListingById(self, request, context):
        """rpc GetBookingByListing(BookingByListingRequest)
        returns (GetListingArrayResponse) {}
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DeleteListingByListingId(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DeleteBookingByHostId(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

def add_ListingServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {'CreateListing': grpc.unary_unary_rpc_method_handler(servicer.CreateListing, request_deserializer=listings__pb2.CreateListingRequest.FromString, response_serializer=listings__pb2.Listing.SerializeToString), 'GetBookingByCity': grpc.unary_unary_rpc_method_handler(servicer.GetBookingByCity, request_deserializer=listings__pb2.ListingByCityRequest.FromString, response_serializer=listings__pb2.GetListingArrayResponse.SerializeToString), 'UpdateListingById': grpc.unary_unary_rpc_method_handler(servicer.UpdateListingById, request_deserializer=listings__pb2.Listing.FromString, response_serializer=listings__pb2.ReturnMessage.SerializeToString), 'DeleteListingByListingId': grpc.unary_unary_rpc_method_handler(servicer.DeleteListingByListingId, request_deserializer=listings__pb2.BookingByListingRequest.FromString, response_serializer=listings__pb2.ReturnMessage.SerializeToString), 'DeleteBookingByHostId': grpc.unary_unary_rpc_method_handler(servicer.DeleteBookingByHostId, request_deserializer=listings__pb2.BookingByHostRequest.FromString, response_serializer=listings__pb2.ReturnMessage.SerializeToString)}
    generic_handler = grpc.method_handlers_generic_handler('listings.ListingService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))

class ListingService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def CreateListing(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/listings.ListingService/CreateListing', listings__pb2.CreateListingRequest.SerializeToString, listings__pb2.Listing.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetBookingByCity(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/listings.ListingService/GetBookingByCity', listings__pb2.ListingByCityRequest.SerializeToString, listings__pb2.GetListingArrayResponse.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def UpdateListingById(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/listings.ListingService/UpdateListingById', listings__pb2.Listing.SerializeToString, listings__pb2.ReturnMessage.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DeleteListingByListingId(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/listings.ListingService/DeleteListingByListingId', listings__pb2.BookingByListingRequest.SerializeToString, listings__pb2.ReturnMessage.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DeleteBookingByHostId(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/listings.ListingService/DeleteBookingByHostId', listings__pb2.BookingByHostRequest.SerializeToString, listings__pb2.ReturnMessage.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)