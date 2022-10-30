package utils

import (
	"fmt"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/pb/bookings"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type ServiceClient struct {
	Client bookings_proto.BookingServiceClient
}

func InitServiceClient(connUrl string) bookings_proto.BookingServiceClient {
	conn, err := grpc.Dial(connUrl, grpc.WithTransportCredentials(insecure.NewCredentials()))

	if err != nil {
		fmt.Println("Could not connect to Bookings service:", err)
	}

	return bookings_proto.NewBookingServiceClient(conn)
}
