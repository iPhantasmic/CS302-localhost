"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
_sym_db = _symbol_database.Default()
from google.protobuf import timestamp_pb2 as google_dot_protobuf_dot_timestamp__pb2
DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0ebookings.proto\x12\x08bookings\x1a\x1fgoogle/protobuf/timestamp.proto"\x85\x01\n\x07Booking\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0f\n\x07user_id\x18\x02 \x01(\x05\x12\x12\n\nlisting_id\x18\x03 \x01(\x05\x12\x0f\n\x07host_id\x18\x04 \x01(\x05\x12\x12\n\nstart_date\x18\x05 \x01(\t\x12\x10\n\x08end_date\x18\x06 \x01(\t\x12\x12\n\npayment_id\x18\x07 \x01(\x05"\x90\x01\n\x1bGetAvailableListingsRequest\x12\x13\n\x0blisting_ids\x18\x01 \x03(\x05\x12.\n\nstart_date\x18\x02 \x01(\x0b2\x1a.google.protobuf.Timestamp\x12,\n\x08end_date\x18\x03 \x01(\x0b2\x1a.google.protobuf.Timestamp"3\n\x1cGetAvailableListingsResponse\x12\x13\n\x0blisting_ids\x18\x01 \x03(\t"\x86\x01\n\x14CreateBookingRequest\x12\x0f\n\x07user_id\x18\x01 \x01(\x05\x12\x12\n\nlisting_id\x18\x02 \x01(\x05\x12\x0f\n\x07host_id\x18\x03 \x01(\x05\x12\x12\n\nstart_date\x18\x04 \x01(\t\x12\x10\n\x08end_date\x18\x05 \x01(\t\x12\x12\n\npayment_id\x18\x06 \x01(\x05">\n\x17GetBookingArrayResponse\x12#\n\x08bookings\x18\x01 \x03(\x0b2\x11.bookings.Booking"-\n\x17BookingByListingRequest\x12\x12\n\nlisting_id\x18\x01 \x01(\x05"\'\n\x14BookingByUserRequest\x12\x0f\n\x07user_id\x18\x01 \x01(\x05"(\n\x12BookingByIdRequest\x12\x12\n\nbooking_id\x18\x01 \x01(\x05"\x92\x01\n\x14UpdateBookingRequest\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0f\n\x07user_id\x18\x02 \x01(\x05\x12\x12\n\nlisting_id\x18\x03 \x01(\x05\x12\x0f\n\x07host_id\x18\x04 \x01(\x05\x12\x12\n\nstart_date\x18\x05 \x01(\t\x12\x10\n\x08end_date\x18\x06 \x01(\t\x12\x12\n\npayment_id\x18\x07 \x01(\x05"\'\n\rReturnMessage\x12\x16\n\x0ereturn_message\x18\x01 \x01(\t2\xc3\x05\n\x0eBookingService\x12D\n\rCreateBooking\x12\x1e.bookings.CreateBookingRequest\x1a\x11.bookings.Booking"\x00\x12W\n\x10GetBookingByUser\x12\x1e.bookings.BookingByUserRequest\x1a!.bookings.GetBookingArrayResponse"\x00\x12]\n\x13GetBookingByListing\x12!.bookings.BookingByListingRequest\x1a!.bookings.GetBookingArrayResponse"\x00\x12N\n\x11UpdateBookingById\x12\x1e.bookings.UpdateBookingRequest\x1a\x17.bookings.ReturnMessage"\x00\x12R\n\x15DeleteBookingByUserId\x12\x1e.bookings.BookingByUserRequest\x1a\x17.bookings.ReturnMessage"\x00\x12X\n\x18DeleteBookingByListingId\x12!.bookings.BookingByListingRequest\x1a\x17.bookings.ReturnMessage"\x00\x12g\n\x14GetAvailableListings\x12%.bookings.GetAvailableListingsRequest\x1a&.bookings.GetAvailableListingsResponse"\x00\x12L\n\x11DeleteBookingById\x12\x1c.bookings.BookingByIdRequest\x1a\x17.bookings.ReturnMessage"\x00b\x06proto3')
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'bookings_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:
    DESCRIPTOR._options = None
    _BOOKING._serialized_start = 62
    _BOOKING._serialized_end = 195
    _GETAVAILABLELISTINGSREQUEST._serialized_start = 198
    _GETAVAILABLELISTINGSREQUEST._serialized_end = 342
    _GETAVAILABLELISTINGSRESPONSE._serialized_start = 344
    _GETAVAILABLELISTINGSRESPONSE._serialized_end = 395
    _CREATEBOOKINGREQUEST._serialized_start = 398
    _CREATEBOOKINGREQUEST._serialized_end = 532
    _GETBOOKINGARRAYRESPONSE._serialized_start = 534
    _GETBOOKINGARRAYRESPONSE._serialized_end = 596
    _BOOKINGBYLISTINGREQUEST._serialized_start = 598
    _BOOKINGBYLISTINGREQUEST._serialized_end = 643
    _BOOKINGBYUSERREQUEST._serialized_start = 645
    _BOOKINGBYUSERREQUEST._serialized_end = 684
    _BOOKINGBYIDREQUEST._serialized_start = 686
    _BOOKINGBYIDREQUEST._serialized_end = 726
    _UPDATEBOOKINGREQUEST._serialized_start = 729
    _UPDATEBOOKINGREQUEST._serialized_end = 875
    _RETURNMESSAGE._serialized_start = 877
    _RETURNMESSAGE._serialized_end = 916
    _BOOKINGSERVICE._serialized_start = 919
    _BOOKINGSERVICE._serialized_end = 1626