"""Client and server classes corresponding to protobuf-defined services."""
import grpc
from . import health_pb2 as health__pb2

class HealthStub(object):
    """Proto file for /health endpoints in services
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.Check = channel.unary_unary('/health.Health/Check', request_serializer=health__pb2.HealthCheckRequest.SerializeToString, response_deserializer=health__pb2.HealthCheckResponse.FromString)

class HealthServicer(object):
    """Proto file for /health endpoints in services
    """

    def Check(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

def add_HealthServicer_to_server(servicer, server):
    rpc_method_handlers = {'Check': grpc.unary_unary_rpc_method_handler(servicer.Check, request_deserializer=health__pb2.HealthCheckRequest.FromString, response_serializer=health__pb2.HealthCheckResponse.SerializeToString)}
    generic_handler = grpc.method_handlers_generic_handler('health.Health', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))

class Health(object):
    """Proto file for /health endpoints in services
    """

    @staticmethod
    def Check(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/health.Health/Check', health__pb2.HealthCheckRequest.SerializeToString, health__pb2.HealthCheckResponse.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)