package services

import (
	"context"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/pb/health"
)

type HealthServer struct {
	health_proto.UnimplementedHealthServer
}

func (s *HealthServer) Check(ctx context.Context, in *health_proto.HealthCheckRequest) (*health_proto.HealthCheckResponse, error) {
	return &health_proto.HealthCheckResponse{Status: health_proto.HealthCheckResponse_SERVING}, nil
}

//func (s *HealthServer) Watch(in *health_proto.HealthCheckRequest, _ health_proto.Health_WatchServer) error {
//	// Example of how to register both methods but only implement the Check method.
//	return status.Error(codes.Unimplemented, "unimplemented")
//}
