"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
_sym_db = _symbol_database.Default()
from google.protobuf import timestamp_pb2 as google_dot_protobuf_dot_timestamp__pb2
DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0ebookings.proto\x12\x08bookings\x1a\x1fgoogle/protobuf/timestamp.proto"\xcb\x01\n\x07Booking\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0f\n\x07user_id\x18\x02 \x01(\t\x12\x12\n\nlisting_id\x18\x03 \x01(\t\x12\x0f\n\x07host_id\x18\x04 \x01(\t\x12 \n\x06status\x18\x05 \x01(\x0e2\x10.bookings.Status\x12.\n\nstart_date\x18\x06 \x01(\x0b2\x1a.google.protobuf.Timestamp\x12,\n\x08end_date\x18\x07 \x01(\x0b2\x1a.google.protobuf.Timestamp"}\n\x1dGetUnavailableListingsRequest\x12.\n\nstart_date\x18\x01 \x01(\x0b2\x1a.google.protobuf.Timestamp\x12,\n\x08end_date\x18\x02 \x01(\x0b2\x1a.google.protobuf.Timestamp"5\n\x1eGetUnavailableListingsResponse\x12\x13\n\x0blisting_ids\x18\x01 \x03(\t"\xaa\x01\n\x14CreateBookingRequest\x12\x0f\n\x07user_id\x18\x01 \x01(\t\x12\x12\n\nlisting_id\x18\x02 \x01(\t\x12\x0f\n\x07host_id\x18\x03 \x01(\t\x12.\n\nstart_date\x18\x04 \x01(\x0b2\x1a.google.protobuf.Timestamp\x12,\n\x08end_date\x18\x05 \x01(\x0b2\x1a.google.protobuf.Timestamp">\n\x17GetBookingArrayResponse\x12#\n\x08bookings\x18\x01 \x03(\x0b2\x11.bookings.Booking"-\n\x17BookingByListingRequest\x12\x12\n\nlisting_id\x18\x01 \x01(\t"\'\n\x14BookingByUserRequest\x12\x0f\n\x07user_id\x18\x01 \x01(\t"(\n\x12BookingByIdRequest\x12\x12\n\nbooking_id\x18\x01 \x01(\t"\xd8\x01\n\x14UpdateBookingRequest\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0f\n\x07user_id\x18\x02 \x01(\t\x12\x12\n\nlisting_id\x18\x03 \x01(\t\x12\x0f\n\x07host_id\x18\x04 \x01(\t\x12 \n\x06status\x18\x05 \x01(\x0e2\x10.bookings.Status\x12.\n\nstart_date\x18\x06 \x01(\x0b2\x1a.google.protobuf.Timestamp\x12,\n\x08end_date\x18\x07 \x01(\x0b2\x1a.google.protobuf.Timestamp"\'\n\rReturnMessage\x12\x16\n\x0ereturn_message\x18\x01 \x01(\t*_\n\x06Status\x12\x16\n\x12STATUS_UNSPECIFIED\x10\x00\x12\x11\n\rSTATUS_ACTIVE\x10\x01\x12\x14\n\x10STATUS_COMPLETED\x10\x02\x12\x14\n\x10STATUS_CANCELLED\x10\x032\x8e\x06\n\x0eBookingService\x12D\n\rCreateBooking\x12\x1e.bookings.CreateBookingRequest\x1a\x11.bookings.Booking"\x00\x12C\n\x0eGetBookingById\x12\x1c.bookings.BookingByIdRequest\x1a\x11.bookings.Booking"\x00\x12W\n\x10GetBookingByUser\x12\x1e.bookings.BookingByUserRequest\x1a!.bookings.GetBookingArrayResponse"\x00\x12]\n\x13GetBookingByListing\x12!.bookings.BookingByListingRequest\x1a!.bookings.GetBookingArrayResponse"\x00\x12N\n\x11UpdateBookingById\x12\x1e.bookings.UpdateBookingRequest\x1a\x17.bookings.ReturnMessage"\x00\x12R\n\x15DeleteBookingByUserId\x12\x1e.bookings.BookingByUserRequest\x1a\x17.bookings.ReturnMessage"\x00\x12X\n\x18DeleteBookingByListingId\x12!.bookings.BookingByListingRequest\x1a\x17.bookings.ReturnMessage"\x00\x12L\n\x11DeleteBookingById\x12\x1c.bookings.BookingByIdRequest\x1a\x17.bookings.ReturnMessage"\x00\x12m\n\x16GetUnavailableListings\x12\'.bookings.GetUnavailableListingsRequest\x1a(.bookings.GetUnavailableListingsResponse"\x00B\x12Z\x10./bookings.protob\x06proto3')
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bookings_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:
    DESCRIPTOR._options = None
    DESCRIPTOR._serialized_options = b'Z\x10./bookings.proto'
    _STATUS._serialized_start = 1076
    _STATUS._serialized_end = 1171
    _BOOKING._serialized_start = 62
    _BOOKING._serialized_end = 265
    _GETUNAVAILABLELISTINGSREQUEST._serialized_start = 267
    _GETUNAVAILABLELISTINGSREQUEST._serialized_end = 392
    _GETUNAVAILABLELISTINGSRESPONSE._serialized_start = 394
    _GETUNAVAILABLELISTINGSRESPONSE._serialized_end = 447
    _CREATEBOOKINGREQUEST._serialized_start = 450
    _CREATEBOOKINGREQUEST._serialized_end = 620
    _GETBOOKINGARRAYRESPONSE._serialized_start = 622
    _GETBOOKINGARRAYRESPONSE._serialized_end = 684
    _BOOKINGBYLISTINGREQUEST._serialized_start = 686
    _BOOKINGBYLISTINGREQUEST._serialized_end = 731
    _BOOKINGBYUSERREQUEST._serialized_start = 733
    _BOOKINGBYUSERREQUEST._serialized_end = 772
    _BOOKINGBYIDREQUEST._serialized_start = 774
    _BOOKINGBYIDREQUEST._serialized_end = 814
    _UPDATEBOOKINGREQUEST._serialized_start = 817
    _UPDATEBOOKINGREQUEST._serialized_end = 1033
    _RETURNMESSAGE._serialized_start = 1035
    _RETURNMESSAGE._serialized_end = 1074
    _BOOKINGSERVICE._serialized_start = 1174
    _BOOKINGSERVICE._serialized_end = 1956