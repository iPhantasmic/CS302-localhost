package main

import (
	"fmt"
	"log"
	"net"

	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/config"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/db"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/auth"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/services"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/utils"
	"google.golang.org/grpc"
)

func main() {
	c, err := config.LoadConfig()

	if err != nil {
		log.Fatalln("Failed at config", err)
	}

	h := db.Init(c.DBUrl)

	jwt := utils.JwtWrapper{
		SecretKey:       c.JWTSecretKey,
		Issuer:          "auth-server",
		ExpirationHours: 24 * 365,
	}

	lis, err := net.Listen("tcp", c.Port)

	if err != nil {
		log.Fatalln("Failed to listing:", err)
	}

	fmt.Println("Auth Svc on", c.Port)

	s := services.Server{
		H:   h,
		Jwt: jwt,
	}

	grpcServer := grpc.NewServer()

	pb.RegisterAuthServiceServer(grpcServer, &s)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalln("Failed to serve:", err)
	}
}
