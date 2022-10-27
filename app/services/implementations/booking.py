from sqlalchemy import or_
from sqlalchemy.orm import Session
import logging
import grpc
from app.services.pb.bookings import bookings_pb2_grpc, bookings_pb2
from app.services.implementations.database import engine, models
from google.protobuf import json_format
from google.protobuf.timestamp_pb2 import Timestamp
from datetime import datetime

log = logging.getLogger(__name__)


session = Session(engine)


def getTimeStamp_fromStr(str_time: str) -> Timestamp:
    str_time = str_time[:-4] + "Z"
    t = datetime.strptime(str_time, "%Y-%m-%dT%H:%M:%S.%fZ").timestamp()
    seconds = int(t)
    nanos = int(t % 1 * 1e9)
    return Timestamp(seconds=seconds, nanos=nanos)


class BookingServicer(bookings_pb2_grpc.BookingServiceServicer):
    """Implements Booking protobuf service interface."""

    def GetBookingByUser(self, request, context):
        """Retrieve a booking from the database, by User ID.
        Args:
            request: The request value for the RPC.
            context (grpc.ServicerContext)
        """
        booking_array = bookings_pb2.GetBookingArrayResponse()
        bookings = (
            session.query(models.Booking)
            .filter(models.Booking.user_id == request.user_id)
            .all()
        )

        if bookings:
            for booking in bookings:
                booking_array.bookings.extend(
                    [
                        bookings_pb2.Booking(
                            id=booking.id,
                            user_id=booking.user_id,
                            listing_id=booking.listing_id,
                            host_id=booking.host_id,
                            start_date=booking.start_date.strftime(
                                "%m/%d/%Y, %H:%M:%S"
                            ),
                            end_date=booking.end_date.strftime("%m/%d/%Y, %H:%M:%S"),
                            payment_id=booking.payment_id,
                        )
                    ]
                )
            context.set_code(grpc.StatusCode.OK)
            return booking_array
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f"Bookings with user id {request.user_id} not found")
            return bookings_pb2.GetBookingArrayResponse()

    def GetBookingByListing(self, request, context):
        booking_array = bookings_pb2.GetBookingArrayResponse()
        bookings = (
            session.query(models.Booking)
            .filter(models.Booking.listing_id == request.listing_id)
            .all()
        )

        if bookings:
            for booking in bookings:
                booking_array.extend(
                    [
                        bookings_pb2.Booking(
                            id=booking.id,
                            user_id=booking.user_id,
                            listing_id=booking.listing_id,
                            host_id=booking.host_id,
                            start_date=booking.start_date.strftime(
                                "%m/%d/%Y, %H:%M:%S"
                            ),
                            end_date=booking.end_date.strftime("%m/%d/%Y, %H:%M:%S"),
                            payment_id=booking.payment_id,
                        )
                    ]
                )
            context.set_code(grpc.StatusCode.OK)
            return booking_array
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(
                f"Bookings with listing id {request.listing_id} not found"
            )
            return bookings_pb2.GetBookingArrayResponse()

    def CreateBooking(self, request, context):
        """Create a new booking given user_id, listing_id and host_id.
        Args:
            request: Request body.
            context (grpc.ServicerContext)
        """

        booking_request = json_format.MessageToDict(
            request, preserving_proto_field_name=True
        )
        print(booking_request)
        print(request)
        new_booking = models.Booking(**booking_request)
        try:
            session.add(new_booking)
            session.commit()
            session.refresh(new_booking)

            booking_request["id"] = str(new_booking.id)  # Convert UUID to str
            booking_request["start_date"] = getTimeStamp_fromStr(
                booking_request["start_date"]
            )
            booking_request["end_date"] = getTimeStamp_fromStr(
                booking_request["end_date"]
            )

            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.Booking(**booking_request)
        except Exception as e:
            print(e)
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Booking failed to be created")
            return bookings_pb2.Booking()

    def GetAvailableListings(self, request, context):
        # listing_request = json_format.MessageToDict(request, preserving_proto_field_name=True)
        print(f"Request listing ids: {request.listing_ids}")

        request_start_datetime = datetime.fromtimestamp(int(request.start_date.seconds))
        request_end_datetime = datetime.fromtimestamp(int(request.end_date.seconds))

        print(f'Start date:{request_start_datetime.strftime("%Y-%m-%d %H:%M")}')
        print(f'End date:{request_end_datetime.strftime("%Y-%m-%d %H:%M")}')

        unavailable_listings = (
            session.query(models.Booking.listing_id)
            .filter(models.Booking.listing_id.in_(request.listing_ids))
            .filter(
                or_(
                    models.Booking.start_date.between(
                        request_start_datetime, request_end_datetime
                    ),
                    models.Booking.end_date.between(
                        request_start_datetime, request_end_datetime
                    ),
                )
            )
            .order_by(
                models.Booking.listing_id,
                models.Booking.start_date,
                models.Booking.end_date,
            )
            .all()
        )

        unavailable_listings_set = {str(tup[0]) for tup in unavailable_listings}
        print(f"Unavail listing ids: {unavailable_listings_set}")

        available_listings = list(
            set(request.listing_ids).difference(unavailable_listings_set)
        )
        print(f"Available listing ids: {available_listings}")

        if len(available_listings) > 0:
            res_array = bookings_pb2.GetAvailableListingsResponse()
            for str_id in available_listings:
                res_array.listing_ids.extend([str_id])
            context.set_code(grpc.StatusCode.OK)
            context.set_details(
                f"Found {len(available_listings)} available listings in the provided timeframe"
            )
            return res_array
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(
                f"No available listing between {request.start_date} and {request.end_date}"
            )
            return bookings_pb2.GetAvailableListingsResponse()

    def DeleteBookingByUserId(self, request, context):
        result = (
            session.query(models.Booking)
            .filter(models.Booking.user_id == request.user_id)
            .all()
        )
        try:
            for booking in result:
                session.delete(booking)
            session.commit()
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(
                return_message=f"All bookings for user id {request.user_id} deleted"
            )
        except Exception as e:
            print(e)
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Delete Failed")
            return bookings_pb2.ReturnMessage(
                return_message=f"Bookings for user id {request.user_id} FAILED to be deleted"
            )

    def DeleteBookingByListingId(self, request, context):
        result = (
            session.query(models.Booking)
            .filter(models.Booking.listing_id == request.listing_id)
            .all()
        )
        try:
            for booking in result:
                session.delete(booking)
            session.commit()
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(
                return_message=f"All bookings for listing id {request.listing_id} deleted"
            )
        except Exception as e:
            print(e)
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Delete Failed")
            return bookings_pb2.ReturnMessage(
                return_message=f"Bookings for listing id {request.listing_id} FAILED to be deleted"
            )

    def DeleteBookingById(self, request, context):
        print(request)
        result = (
            session.query(models.Booking)
            .filter(models.Booking.id == request.booking_id)
            .all()
        )
        print(result)
        try:
            if result:
                for booking in result:
                    session.delete(booking)
                session.commit()
                context.set_code(grpc.StatusCode.OK)
                return bookings_pb2.ReturnMessage(
                    return_message=f"All bookings for id {request.booking_id} deleted"
                )
            else:
                context.set_code(grpc.StatusCode.OK)
                return bookings_pb2.ReturnMessage(
                    return_message=f"No bookings for id {request.booking_id} found to be deleted"
                )
        except Exception as e:
            print(e)
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Delete Failed")
            return bookings_pb2.ReturnMessage(
                return_message=f"Bookings for id {request.booking_id} FAILED to be deleted"
            )

    def UpdateBookingById(self, request, context):
        booking_dict = json_format.MessageToDict(
            request, preserving_proto_field_name=True
        )

        try:
            session.query(models.Booking).filter(
                models.Booking.id == request.id
            ).update(booking_dict)
            session.commit()
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(
                return_message=f"Booking with id {request.id} updated"
            )
        except Exception as e:
            print(e)
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Update Failed")
            return bookings_pb2.ReturnMessage(
                return_message=f"Bookings with id {request.id} FAILED to be updated"
            )
