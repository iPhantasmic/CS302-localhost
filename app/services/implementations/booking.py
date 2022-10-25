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

        corresponding_bookings = session.query(models.Booking) \
            .filter(models.Booking.listing_id.in_(request.listing_ids)).group_by(models.Booking.listing_id).all()
        
        print(corresponding_bookings)

    #     a_busy = [
    #     {'start': datetime.datetime(2020, 1, 1, 6), 'end': datetime.datetime(2020, 1, 1, 6, 30)},
    #     {'start': datetime.datetime(2020, 1, 1, 7), 'end': datetime.datetime(2020, 1, 1, 8)},
    #     {'start': datetime.datetime(2020, 1, 1, 7, 30), 'end': datetime.datetime(2020, 1, 1, 9, 30)},
    #     {'start': datetime.datetime(2020, 1, 1, 11), 'end': datetime.datetime(2020, 1, 1, 12, 30)},
    #     {'start': datetime.datetime(2020, 1, 1, 15), 'end': datetime.datetime(2020, 1, 1, 15, 45)},
    #     {'start': datetime.datetime(2020, 1, 1, 16, 45), 'end': datetime.datetime(2020, 1, 1, 17, 30)}
    # ]

    # b_busy = [
    #     {'start': datetime.datetime(2020, 1, 1, 5, 45), 'end': datetime.datetime(2020, 1, 1, 6, 30)},
    #     {'start': datetime.datetime(2020, 1, 1, 7, 30), 'end': datetime.datetime(2020, 1, 1, 8)},
    #     {'start': datetime.datetime(2020, 1, 1, 8), 'end': datetime.datetime(2020, 1, 1, 9)},
    #     {'start': datetime.datetime(2020, 1, 1, 10, 30), 'end': datetime.datetime(2020, 1, 1, 13)},
    #     {'start': datetime.datetime(2020, 1, 1, 14), 'end': datetime.datetime(2020, 1, 1, 15)},
    #     {'start': datetime.datetime(2020, 1, 1, 15, 30), 'end': datetime.datetime(2020, 1, 1, 16, 30)}
    # ]
    # # free times: 6:30-7, 9:30-10:30, 13:00-14:00, 16:30-16:45
    # tstart = datetime.datetime(2020, 1, 1, 6)
    # tstop = datetime.datetime(2020, 1, 1, 17)

    # together = sorted(a_busy + b_busy, key=lambda k: k['start'])
    # tp = [(tstart, tstart)]
    # free_time = []
    # for t in together:
    #     tp.append((t['start'], t['end']))
    # tp.append((tstop, tstop))

    # # This section added to resolve the case mentioned above
    # i = 1
    # while i < len(tp):
    #     if tp[i][0] < tp[i - 1][1]:
    #         start_times = [tp[i - 1][0], tp[i][0]]
    #         end_times = [tp[i - 1][1], tp[i][1]]
    #         tp[i - 1] = (min(start_times), max(end_times))
    #         tp.pop(i)
    #     else:
    #         i += 1

    # for i, v in enumerate(tp):
    #     if i > 0:
    #         if (tp[i][0] - tp[i - 1][1]) > datetime.timedelta(seconds=0):
    #             tf_start = tp[i - 1][1]
    #             delta = tp[i][0] - tp[i - 1][1]
    #             tf_end = tf_start + delta
    #             free_time.append(tup)
        if corresponding_bookings:
            pass
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f'No available listing between {request.start_date} and {request.start_date}')
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
            for booking in result:
                session.delete(booking)
            session.commit()
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(return_message=f"All bookings for id {request.booking_id} deleted")
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
