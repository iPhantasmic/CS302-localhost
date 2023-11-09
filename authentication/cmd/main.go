package main

import (
	"fmt"
	"log"
	"net"

	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/config"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/db"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/auth"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/health"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/users"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/services"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/utils"
	"google.golang.org/grpc"
)

func main() {
	c, err := config.LoadConfig()
	if err != nil {
		log.Fatalln("Failed at config", err)
	}

	dbUrl := "postgres://" + c.DBUser + ":" + c.DBPassword + "@" + c.DBHost + ":" + c.DBPort + "/" + c.DBSchema
	h := db.Init(dbUrl)

	jwt := utils.JwtWrapper{
		SecretKey:       c.JWTSecretKey,
		Issuer:          "auth-server",
		ExpirationHours: 24 * 365,
	}

	lis, err := net.Listen("tcp", c.Port)
	if err != nil {
		log.Fatalln("Failed to listen:", err)
	}

	fmt.Println("Authentication and User Service listening on", c.Port)

	authServer := services.AuthServer{
		H:   h,
		Jwt: jwt,
	}

	userServer := services.UserServer{
		H: h,
	}

	healthServer := services.HealthServer{}

	grpcServer := grpc.NewServer()

	auth_proto.RegisterAuthServiceServer(grpcServer, &authServer)
	users_proto.RegisterUserServiceServer(grpcServer, &userServer)
	health_proto.RegisterHealthServer(grpcServer, &healthServer)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalln("Failed to serve:", err)
	}
}
