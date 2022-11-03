from sqlalchemy import or_
from sqlalchemy.orm import Session
import logging
import grpc
from google.protobuf.timestamp_pb2 import Timestamp
from app.services.pb.bookings import bookings_pb2_grpc, bookings_pb2
from app.services.implementations.database import engine, models
from google.protobuf import json_format
from datetime import datetime

log = logging.getLogger(__name__)


session = Session(engine)


def getTimeStamp_fromStr(str_time: str, from_db: bool = False) -> Timestamp:
    if from_db:
        str_time = str_time[:10] + "T" + str_time[11:]
    else:
        str_time = str_time[:-4]

    str_time += "Z"
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

    def GetUnavailableListings(self, request, context):
        request_start_datetime = datetime.fromtimestamp(int(request.start_date.seconds))
        request_end_datetime = datetime.fromtimestamp(int(request.end_date.seconds))

        # Retrieve unavailable listings during timeframe, and pass it to listings service via the orchestrator
        # Listings service filters listings that are not in the unavailable list to present to user
        unavailable_listings = (
            session.query(models.Booking.listing_id)
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

        unavailable_listings = list({str(tup[0]) for tup in unavailable_listings})

        if len(unavailable_listings) > 0:
            unavail_res_array = bookings_pb2.GetUnavailableListingsResponse()
            for str_id in unavailable_listings:
                unavail_res_array.listing_ids.extend([str_id])
            context.set_code(grpc.StatusCode.OK)
            context.set_details(
                f"Found {len(unavailable_listings)} unavailable listings in the provided timeframe"
            )
            return unavail_res_array
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(
                f"All listings available between {request.start_date} and {request.end_date}"
            )
            return bookings_pb2.GetUnavailableListingsResponse()

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

    def GetBookingById(self, request, context):
        booking = (
            session.query(models.Booking)
            .filter(models.Booking.id == request.booking_id)
            .all()
        )
        if booking:
            booking = booking[0]
            start_date = getTimeStamp_fromStr(str(booking.start_date), from_db=True)
            end_date = getTimeStamp_fromStr(str(booking.end_date), from_db=True)
            booking_returned = bookings_pb2.Booking(
                id=str(booking.id),
                user_id=str(booking.user_id),
                listing_id=str(booking.listing_id),
                host_id=str(booking.host_id),
                start_date=start_date,
                end_date=end_date,
                payment_id=str(booking.payment_id),
            )
            print(booking_returned)
            context.set_code(grpc.StatusCode.OK)
            return booking_returned
        context.set_code(grpc.StatusCode.INTERNAL)
        return bookings_pb2.Booking()
