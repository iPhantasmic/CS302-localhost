from sqlalchemy import or_
from sqlalchemy.orm import Session
import logging
import grpc
from google.protobuf.timestamp_pb2 import Timestamp
from app.services.pb.bookings import bookings_pb2_grpc, bookings_pb2
from app.services.implementations.database import engine, models
from google.protobuf import json_format
from datetime import datetime

logger = logging.getLogger(__name__)


session = Session(engine)

statuses = {
    "STATUS_UNSPECIFIED": 0,
    "STATUS_ACTIVE": 1,
    "STATUS_COMPLETED":2,
    "STATUS_CANCELLED": 3
}


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
                start_date = getTimeStamp_fromStr(str(booking.start_date), from_db=True)
                end_date = getTimeStamp_fromStr(str(booking.end_date), from_db=True)
                booking_array.bookings.extend(
                    [
                        bookings_pb2.Booking(
                            id=booking.id,
                            user_id=booking.user_id,
                            listing_id=booking.listing_id,
                            host_id=booking.host_id,
                            start_date=start_date,
                            end_date=end_date,
                            status=bookings_pb2.Status.STATUS_ACTIVE,
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
                start_date = getTimeStamp_fromStr(str(booking.start_date), from_db=True)
                end_date = getTimeStamp_fromStr(str(booking.end_date), from_db=True)
                booking_array.bookings.extend(
                    [
                        bookings_pb2.Booking(
                            id=str(booking.id),
                            user_id=str(booking.user_id),
                            listing_id=str(booking.listing_id),
                            host_id=str(booking.host_id),
                            status=bookings_pb2.Status.STATUS_ACTIVE,
                            start_date=start_date,
                            end_date=end_date,
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

        request_start_datetime = datetime.fromtimestamp(int(request.start_date.seconds))
        request_end_datetime = datetime.fromtimestamp(int(request.end_date.seconds))
        booking_request["start_date"] = request_start_datetime
        booking_request["end_date"] = request_end_datetime
        booking_request["status"] = statuses["STATUS_ACTIVE"]

        new_booking = models.Booking(**booking_request)
        try:
            session.add(new_booking)
            session.commit()
            session.refresh(new_booking)
            

            booking_request["id"] = str(new_booking.id)  # Convert UUID to str
            booking_request["start_date"] = getTimeStamp_fromStr(
                str(new_booking.start_date), 
                from_db=True
            )
            booking_request["end_date"] = getTimeStamp_fromStr(
                str(new_booking.end_date), 
                from_db=True
            )

            context.set_code(grpc.StatusCode.OK)
            logger.info(f"Booking created: {booking_request}")
            return bookings_pb2.Booking(**booking_request)
        except Exception as e:
            logger.error(f"Error in booking creation: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Booking failed to be created")
            return bookings_pb2.Booking()

    def GetUnavailableListings(self, request, context):
        request_start_datetime = datetime.fromtimestamp(int(request.start_date.seconds))
        request_end_datetime = datetime.fromtimestamp(int(request.end_date.seconds))

        # Retrieve unavailable listings during timeframe, and pass it to listings service via the orchestrator
        # Listings service filters listings that are not in the unavailable list to present to users
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

        unavail_res_array = bookings_pb2.GetUnavailableListingsResponse()
        for str_id in unavailable_listings:
            unavail_res_array.listing_ids.extend([str_id])
        logger.info(f"Found {len(unavailable_listings)} unavailable listings in the provided timeframe")
        context.set_code(grpc.StatusCode.OK)
        context.set_details(
            f"Found {len(unavailable_listings)} unavailable listings in the provided timeframe"
        )
        return unavail_res_array

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
            logger.info(f"All bookings for user id {request.user_id} deleted")
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(
                return_message=f"All bookings for user id {request.user_id} deleted"
            )
        except Exception as e:
            logger.error(f"Error in booking deletion: {e}")
            session.rollback()
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
            logger.info(f"All bookings for listing id:{request.listing_id} deleted")
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(
                return_message=f"All bookings for listing id {request.listing_id} deleted"
            )
        except Exception as e:
            logger.error(f"Error in booking deletion: {e}")
            session.rollback()
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Delete Failed")
            return bookings_pb2.ReturnMessage(
                return_message=f"Bookings for listing id {request.listing_id} FAILED to be deleted"
            )

    def DeleteBookingById(self, request, context):
        result = (
            session.query(models.Booking)
            .filter(models.Booking.id == request.booking_id)
            .all()
        )
        if result:
            try:
                for booking in result:
                    session.delete(booking)
                    session.commit()
                    logger.info(f"All bookings for id {request.booking_id} deleted")
                    context.set_code(grpc.StatusCode.OK)
                    return bookings_pb2.ReturnMessage(
                        return_message=f"All bookings for id {request.booking_id} deleted"
                    )
            except Exception as e:
                logger.error(f"Error in booking deletion: {e}")
                session.rollback()
                context.set_code(grpc.StatusCode.INTERNAL)
                context.set_details("Delete Failed")
                return bookings_pb2.ReturnMessage(
                    return_message=f"Bookings for id {request.booking_id} FAILED to be deleted"
                )
        else:
            context.set_code(grpc.StatusCode.OK)
            return bookings_pb2.ReturnMessage(
                return_message=f"No bookings for id {request.booking_id} found to be deleted"
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
            logger.error(f"Error in booking deletion: {e}")
            session.rollback()
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Update Failed")
            return bookings_pb2.ReturnMessage(
                return_message=f"Bookings with id {request.id} FAILED to be updated"
            )

    def GetBookingById(self, request, context):
        booking = (
            session.query(models.Booking)
            .filter(models.Booking.id == request.booking_id)
            .first()
        )
        if booking:
            start_date = getTimeStamp_fromStr(str(booking.start_date), from_db=True)
            end_date = getTimeStamp_fromStr(str(booking.end_date), from_db=True)
            booking_returned = bookings_pb2.Booking(
                id=str(booking.id),
                user_id=str(booking.user_id),
                listing_id=str(booking.listing_id),
                host_id=str(booking.host_id),
                start_date=start_date,
                end_date=end_date,
                status=booking.status
            )
            context.set_code(grpc.StatusCode.OK)
            return booking_returned
        logger.info(f"No booking found for id {request.booking_id}")
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set_details(
                f"No booking found for id {request.booking_id}"
        )
        return bookings_pb2.Booking()
