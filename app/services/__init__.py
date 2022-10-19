import os
import grpc


class GrpcServiceConnector(object):
    """Provides a simple wrapper around grpc service stubs.
    Args:
        service_class: stub class generated by grpc.tools.protoc
    Attributes:
        stub: an instance of self.service_class that has been connected to
            a grpc server
    Usage:
        GrpcServiceConnector(health_pb2.HealthStub).start()
    """

    def __init__(self, service_class):
        self._grpc_api_address = os.environ['GRPC_API_URL']
        self._channel = None
        self._stub = None
        self._service_class = service_class

    def start(self):
        """Connect to the grpc service corresponding to self.service_class.
        Note: self._stub will be created even if the grpc server is down,
            in which case any RPC calls will return with a
            grpc.StatusCode.UNAVAILABLE.
        """
        self._channel = grpc.insecure_channel(self._grpc_api_address)
        self._stub = self._service_class(self._channel)

    @property
    def stub(self):
        """Getter for self._stub."""
        if self._stub is None:
            service_class_name = self._service_class.__name__
            raise AttributeError("stub '%s' is empty" % service_class_name)

        return self._stub