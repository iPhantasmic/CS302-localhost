package main

import (
	"fmt"
	"log"
	"net"

	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/config"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/db"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/pb/health"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/pb/reviews"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/services"
	"google.golang.org/grpc"
)

func main() {
	c, err := config.LoadConfig()
	if err != nil {
		log.Fatalln("Failed to load configs", err)
	}

	dbUrl := "postgres://" + c.DBUser + ":" + c.DBPassword + "@" + c.DBHost + ":" + c.DBPort + "/" + c.DBSchema
	h := db.Init(dbUrl)

	lis, err := net.Listen("tcp", c.Port)
	if err != nil {
		log.Fatalln("Failed to listen:", err)
	}

	fmt.Println("Reviews Service listening on", c.Port)

	reviewServer := services.ReviewServer{
		H: h,
	}

	healthServer := services.HealthServer{}

	grpcServer := grpc.NewServer()

	reviews_proto.RegisterReviewServiceServer(grpcServer, &reviewServer)
	health_proto.RegisterHealthServer(grpcServer, &healthServer)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalln("Failed to serve:", err)
	}
}
