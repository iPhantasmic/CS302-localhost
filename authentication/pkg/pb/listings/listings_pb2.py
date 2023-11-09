"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
_sym_db = _symbol_database.Default()
DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0elistings.proto\x12\x08listings"\xd2\x01\n\x07Listing\x12\x0f\n\x07list_id\x18\x01 \x01(\x05\x12\x0f\n\x07host_id\x18\x02 \x01(\x05\x12\r\n\x05title\x18\x03 \x01(\t\x12\x0c\n\x04cost\x18\x04 \x01(\x02\x12\x1f\n\x06images\x18\x05 \x03(\x0b2\x0f.listings.Image\x12\x1c\n\x04type\x18\x06 \x01(\x0e2\x0e.listings.Type\x12\x0f\n\x07address\x18\x07 \x01(\t\x12\x0c\n\x04city\x18\x08 \x01(\t\x12\x0f\n\x07country\x18\t \x01(\t\x12\x0c\n\x04room\x18\n \x01(\x05\x12\x0b\n\x03bed\x18\x0b \x01(\x05":\n\x05Image\x12\r\n\x05width\x18\x01 \x01(\x05\x12\x0e\n\x06height\x18\x02 \x01(\x05\x12\x12\n\nimage_data\x18\x03 \x01(\x0c"\xce\x01\n\x14CreateListingRequest\x12\x0f\n\x07host_id\x18\x01 \x01(\x05\x12\r\n\x05title\x18\x02 \x01(\t\x12\x0c\n\x04cost\x18\x03 \x01(\x02\x12\x1f\n\x06images\x18\x04 \x03(\x0b2\x0f.listings.Image\x12\x1c\n\x04type\x18\x05 \x01(\x0e2\x0e.listings.Type\x12\x0f\n\x07address\x18\x06 \x01(\t\x12\x0c\n\x04city\x18\x07 \x01(\t\x12\x0f\n\x07country\x18\x08 \x01(\t\x12\x0c\n\x04room\x18\t \x01(\x05\x12\x0b\n\x03bed\x18\n \x01(\x05"$\n\x14ListingByCityRequest\x12\x0c\n\x04city\x18\x01 \x01(\t">\n\x17GetListingArrayResponse\x12#\n\x08listings\x18\x01 \x03(\x0b2\x11.listings.Listing"\'\n\rReturnMessage\x12\x16\n\x0ereturn_message\x18\x01 \x01(\t"*\n\x17BookingByListingRequest\x12\x0f\n\x07list_id\x18\x01 \x01(\x05"\'\n\x14BookingByHostRequest\x12\x0f\n\x07host_id\x18\x01 \x01(\x05*[\n\x04Type\x12\x14\n\x10TYPE_UNSPECIFIED\x10\x00\x12\r\n\tTYPE_FLAT\x10\x01\x12\x14\n\x10TYPE_CONDOMINIUM\x10\x02\x12\x18\n\x14TYPE_LANDED_PROPERTY\x10\x032\xa0\x03\n\x0eListingService\x12D\n\rCreateListing\x12\x1e.listings.CreateListingRequest\x1a\x11.listings.Listing"\x00\x12W\n\x10GetBookingByCity\x12\x1e.listings.ListingByCityRequest\x1a!.listings.GetListingArrayResponse"\x00\x12A\n\x11UpdateListingById\x12\x11.listings.Listing\x1a\x17.listings.ReturnMessage"\x00\x12X\n\x18DeleteListingByListingId\x12!.listings.BookingByListingRequest\x1a\x17.listings.ReturnMessage"\x00\x12R\n\x15DeleteBookingByHostId\x12\x1e.listings.BookingByHostRequest\x1a\x17.listings.ReturnMessage"\x00b\x06proto3')
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'listings_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:
    DESCRIPTOR._options = None
    _TYPE._serialized_start = 738
    _TYPE._serialized_end = 829
    _LISTING._serialized_start = 29
    _LISTING._serialized_end = 239
    _IMAGE._serialized_start = 241
    _IMAGE._serialized_end = 299
    _CREATELISTINGREQUEST._serialized_start = 302
    _CREATELISTINGREQUEST._serialized_end = 508
    _LISTINGBYCITYREQUEST._serialized_start = 510
    _LISTINGBYCITYREQUEST._serialized_end = 546
    _GETLISTINGARRAYRESPONSE._serialized_start = 548
    _GETLISTINGARRAYRESPONSE._serialized_end = 610
    _RETURNMESSAGE._serialized_start = 612
    _RETURNMESSAGE._serialized_end = 651
    _BOOKINGBYLISTINGREQUEST._serialized_start = 653
    _BOOKINGBYLISTINGREQUEST._serialized_end = 695
    _BOOKINGBYHOSTREQUEST._serialized_start = 697
    _BOOKINGBYHOSTREQUEST._serialized_end = 736
    _LISTINGSERVICE._serialized_start = 832
    _LISTINGSERVICE._serialized_end = 1248