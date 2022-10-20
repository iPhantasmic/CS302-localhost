import logging
import grpc
from app.services.pb.bookings import bookings_pb2_grpc, bookings_pb2
from app.services.implementations.database import (
        connection as db, models)

log = logging.getLogger(__name__)


class BookingServicer(bookings_pb2_grpc.BookingServicer):
    """Implements Booking protobuf service interface."""
    
    def GetBookingByUser(self,request, context):
        """Retrieve a booking from the database, by User ID.
        Args:
            request: The request value for the RPC.
            context (grpc.ServicerContext)
        """
        booking_array = []
        bookings = db.query(models.Booking).filter(models.Booking.user_id==request.user_id).all()

        if bookings:
            for booking in bookings:
                booking_array.append(bookings_pb2.Booking(id=booking.id, user_id=booking.user_id, listing_id = booking.listing_id, host_id = booking.host_id,start_date= booking.start_date, end_date=booking.end_date,payment_id = booking.payment_id))
            return bookings_pb2.GetBookingArrayResponse(bookings=booking_array)
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Bookings with user id %s not found' % request.user_id)
            return bookings_pb2.GetBookingArrayResponse()

    def GetBookingByListing(self,request,context):
        booking_array = []
        bookings = db.query(models.Booking).filter(models.Booking.listing_id==request.listing_id).all()

        if bookings:
            for booking in bookings:
                booking_array.append(bookings_pb2.Booking(id=booking.id, user_id=booking.user_id, listing_id = booking.listing_id, host_id = booking.host_id,start_date= booking.start_date, end_date=booking.end_date,payment_id = booking.payment_id))
            return bookings_pb2.GetBookingArrayResponse(bookings=booking_array)
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Bookings with listing id %s not found' % request.listing_id)
            return bookings_pb2.GetBookingArrayResponse()

    def CreateBooking(self, request, context):
        """Create a new booking given user_id, listing_id and host_id.
        Args:
            request: Request body.
            context (grpc.ServicerContext)
        """
        booking_request = google.protobuf.json_format.MessageToDict(request, preserving_proto_field_name=True)
        new_booking = models.Booking(**booking_request)
        try:
            db.add(new_booking)
            db.commit()
            return bookings_pb2.Booking(**booking_request)
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Booking failed to be created')
            return bookings_pb2.CreateBookingRequest()
    
    def DeleteBookingByUserId(self,request,context):
        result = db.query(models.Booking).filter(models.Booking.user_id==request.user_id).all()
        try:
            for booking in result:
                db.delete(booking)
            db.commit()
            return bookings_pb2.ReturnMessage(return_message="All bookings for user id %s deleted" % request.user_id)
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Delete Failed')
            return bookings_pb2.ReturnMessage(return_message="Bookings for user id %s FAILED to be deleted" % request.user_id)

    def DeleteBookingByListingId(self,request,context):
        result = db.query(models.Booking).filter(models.Booking.listing_id==request.listing_id).all()
        try:
            for booking in result:
                db.delete(booking)
            db.commit()
            return bookings_pb2.ReturnMessage(return_message="All bookings for listing id %s deleted" % request.listing_id)
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Delete Failed')
            return bookings_pb2.ReturnMessage(return_message="Bookings for listing id %s FAILED to be deleted" % request.listing_id)

    def UpdateBookingById(self,request, context):
        booking_dict = google.protobuf.json_format.MessageToDict(request, preserving_proto_field_name=True)

        try:
            result = db.query(models.Booking) \
                    .filter(models.Booking.id==request.id).update(booking_dict)
            db.commit()
            return bookings_pb2.ReturnMessage(return_message="Booking with id %s updated" % request.id)
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Update Failed')
            return bookings_pb2.ReturnMessage(return_message="Bookings with id %s FAILED to be updated" % request.id)
