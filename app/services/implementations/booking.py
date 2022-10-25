import logging
import grpc
from app.services.pb.bookings import bookings_pb2_grpc, bookings_pb2
from app.services.implementations.database import (
        engine, models)
from google.protobuf import json_format

log = logging.getLogger(__name__)

from sqlalchemy.orm import Session

session = Session(engine)


class BookingServicer(bookings_pb2_grpc.BookingServiceServicer):
    """Implements Booking protobuf service interface."""
    
    def GetBookingByUser(self,request, context):
        """Retrieve a booking from the database, by User ID.
        Args:
            request: The request value for the RPC.
            context (grpc.ServicerContext)
        """
        booking_array = bookings_pb2.GetBookingArrayResponse()
        bookings = session.query(models.Booking).filter(models.Booking.user_id==request.user_id).all()

        if bookings:
            for booking in bookings:
                booking_array.bookings.extend([bookings_pb2.Booking(id=booking.id, user_id=booking.user_id, listing_id = booking.listing_id, host_id = booking.host_id,start_date= booking.start_date.strftime('%m/%d/%Y, %H:%M:%S'), end_date=booking.end_date.strftime('%m/%d/%Y, %H:%M:%S') ,payment_id = booking.payment_id)])
            context.set_code(grpc.StatusCode.OK)
            return booking_array
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f'Bookings with user id {request.user_id} not found')
            return bookings_pb2.GetBookingArrayResponse()

    def GetBookingByListing(self,request,context):
        booking_array = bookings_pb2.GetBookingArrayResponse()
        bookings = session.query(models.Booking).filter(models.Booking.listing_id==request.listing_id).all()

        if bookings:
            for booking in bookings:
                booking_array.extend([bookings_pb2.Booking(id=booking.id, user_id=booking.user_id, listing_id = booking.listing_id, host_id = booking.host_id,start_date= booking.start_date.strftime('%m/%d/%Y, %H:%M:%S'), end_date=booking.end_date.strftime('%m/%d/%Y, %H:%M:%S') ,payment_id = booking.payment_id)])
            context.set_code(grpc.StatusCode.OK)
            return booking_array
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f'Bookings with listing id {request.listing_id} not found')
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
            session.add(new_booking)
            session.commit()
            session.refresh(new_booking)
            booking_request["id"] = new_booking.id
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.Booking(**booking_request)
        except Exception as e:
            print(e)
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Booking failed to be created')
            return bookings_pb2.CreateBookingRequest()
    
    def GetAvailableListings(self, request, context):
        listing_request = json_format.MessageToDict(request, preserving_proto_field_name=True)

        request_start_date = request.start_date.nanos
        request_end_date = request.end_date.nanos

        corresponding_bookings = session.query(models.Booking.listing_id, models.Booking.start_date, models.Booking.end_date) \
                                .filter(models.Booking.listing_id.in_(request.listing_ids)) \
                                .group_by(models.Booking.listing_id, models.Booking.start_date, models.Booking.end_date) \
                                .all()
        
        print(corresponding_bookings)

        if corresponding_bookings:
            pass
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f'No available listing between {request.start_date} and {request.end_date}')
            return bookings_pb2.GetBookingArrayResponse()
    
    def DeleteBookingByUserId(self,request,context):
        result = session.query(models.Booking).filter(models.Booking.user_id==request.user_id).all()
        try:
            for booking in result:
                session.delete(booking)
            session.commit()
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(return_message=f"All bookings for user id {request.user_id} deleted")
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Delete Failed')
            return bookings_pb2.ReturnMessage(return_message=f"Bookings for user id {request.user_id} FAILED to be deleted")

    def DeleteBookingByListingId(self,request,context):
        result = session.query(models.Booking).filter(models.Booking.listing_id==request.listing_id).all()
        try:
            for booking in result:
                session.delete(booking)
            session.commit()
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(return_message=f"All bookings for listing id {request.listing_id} deleted")
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Delete Failed')
            return bookings_pb2.ReturnMessage(return_message=f"Bookings for listing id {request.listing_id} FAILED to be deleted")
    
    def DeleteBookingById(self,request,context):
        result = session.query(models.Booking).filter(models.Booking.id==request.booking_id).all()
        try:
            if result:
                for booking in result:
                    session.delete(booking)
                session.commit()
                context.set_code(grpc.StatusCode.OK)
                return bookings_pb2.ReturnMessage(return_message=f"All bookings for id {request.booking_id} deleted")
            else:
                context.set_code(grpc.StatusCode.OK)
                return bookings_pb2.ReturnMessage(return_message=f"No bookings for id {request.booking_id} found to be deleted")
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Delete Failed')
            return bookings_pb2.ReturnMessage(return_message=f"Bookings for id {request.booking_id} FAILED to be deleted")

    def UpdateBookingById(self,request, context):
        booking_dict = json_format.MessageToDict(request, preserving_proto_field_name=True)

        try:
            result = session.query(models.Booking) \
                    .filter(models.Booking.id==request.id).update(booking_dict)
            session.commit()
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(return_message=f"Booking with id {request.id} updated")
        except:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Update Failed')
            return bookings_pb2.ReturnMessage(return_message=f"Bookings with id {request.id} FAILED to be updated")
