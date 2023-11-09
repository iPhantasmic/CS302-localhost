"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
_sym_db = _symbol_database.Default()
DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0chealth.proto\x12\x06health"%\n\x12HealthCheckRequest\x12\x0f\n\x07service\x18\x01 \x01(\t"\x8c\x01\n\x13HealthCheckResponse\x129\n\x06status\x18\x01 \x01(\x0e2).health.HealthCheckResponse.ServingStatus":\n\rServingStatus\x12\x0b\n\x07UNKNOWN\x10\x00\x12\x0b\n\x07SERVING\x10\x01\x12\x0f\n\x0bNOT_SERVING\x10\x022J\n\x06Health\x12@\n\x05Check\x12\x1a.health.HealthCheckRequest\x1a\x1b.health.HealthCheckResponseB\x10Z\x0e./health.protob\x06proto3')
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'health_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:
    DESCRIPTOR._options = None
    DESCRIPTOR._serialized_options = b'Z\x0e./health.proto'
    _HEALTHCHECKREQUEST._serialized_start = 24
    _HEALTHCHECKREQUEST._serialized_end = 61
    _HEALTHCHECKRESPONSE._serialized_start = 64
    _HEALTHCHECKRESPONSE._serialized_end = 204
    _HEALTHCHECKRESPONSE_SERVINGSTATUS._serialized_start = 146
    _HEALTHCHECKRESPONSE_SERVINGSTATUS._serialized_end = 204
    _HEALTH._serialized_start = 206
    _HEALTH._serialized_end = 280