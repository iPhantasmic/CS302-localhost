import logging
import grpc
from app.services.pb.bookings import bookings_pb2_grpc, bookings_pb2
from app.services.implementations.database import (
        connection as db, models)
from google.protobuf import json_format

log = logging.getLogger(__name__)


class BookingServicer(bookings_pb2_grpc.BookingServiceServicer):
    """Implements Booking protobuf service interface."""
    
    def GetBookingByUser(self,request, context):
        """Retrieve a booking from the database, by User ID.
        Args:
            request: The request value for the RPC.
            context (grpc.ServicerContext)
        """
        booking_array = bookings_pb2.GetBookingArrayResponse()
        bookings = db.query(models.Booking).filter(models.Booking.user_id==request.user_id).all()

        if bookings:
            for booking in bookings:
                booking_array.bookings.extend([bookings_pb2.Booking(id=booking.id, user_id=booking.user_id, listing_id = booking.listing_id, host_id = booking.host_id,start_date= booking.start_date.strftime('%m/%d/%Y, %H:%M:%S'), end_date=booking.end_date.strftime('%m/%d/%Y, %H:%M:%S') ,payment_id = booking.payment_id)])
            return booking_array
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Bookings with user id {request.user_id} not found')
            return bookings_pb2.GetBookingArrayResponse()

    def GetBookingByListing(self,request,context):
        booking_array = bookings_pb2.GetBookingArrayResponse()
        bookings = db.query(models.Booking).filter(models.Booking.listing_id==request.listing_id).all()

        if bookings:
            for booking in bookings:
                booking_array.extend([bookings_pb2.Booking(id=booking.id, user_id=booking.user_id, listing_id = booking.listing_id, host_id = booking.host_id,start_date= booking.start_date.strftime('%m/%d/%Y, %H:%M:%S'), end_date=booking.end_date.strftime('%m/%d/%Y, %H:%M:%S') ,payment_id = booking.payment_id)])
            return booking_array
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Bookings with listing id {request.listing_id} not found')
            return bookings_pb2.GetBookingArrayResponse()

    def CreateBooking(self, request, context):
        """Create a new booking given user_id, listing_id and host_id.
        Args:
            request: Request body.
            context (grpc.ServicerContext)
        """
        booking_request = json_format.MessageToDict(request, preserving_proto_field_name=True)
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
            return bookings_pb2.ReturnMessage(return_message=f"All bookings for user id {request.user_id} deleted")
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Delete Failed')
            return bookings_pb2.ReturnMessage(return_message="Bookings for user id {request.user_id} FAILED to be deleted")

    def DeleteBookingByListingId(self,request,context):
        result = db.query(models.Booking).filter(models.Booking.listing_id==request.listing_id).all()
        try:
            for booking in result:
                db.delete(booking)
            db.commit()
            return bookings_pb2.ReturnMessage(return_message="All bookings for listing id {request.listing_id} deleted")
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Delete Failed')
            return bookings_pb2.ReturnMessage(return_message="Bookings for listing id {request.listing_id} FAILED to be deleted")

    def UpdateBookingById(self,request, context):
        booking_dict = json_format.MessageToDict(request, preserving_proto_field_name=True)

        try:
            result = db.query(models.Booking) \
                    .filter(models.Booking.id==request.id).update(booking_dict)
            db.commit()
            return bookings_pb2.ReturnMessage(return_message="Booking with id {request.id} updated")
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Update Failed')
            return bookings_pb2.ReturnMessage(return_message="Bookings with id {request.id} FAILED to be updated")
