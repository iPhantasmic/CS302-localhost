package services

import (
	"context"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/db"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/auth"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/utils"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type AuthServer struct {
	H   db.Handler
	Jwt utils.JwtWrapper
	auth_proto.UnimplementedAuthServiceServer
}

func (s *AuthServer) Register(ctx context.Context, req *auth_proto.RegisterRequest) (*auth_proto.RegisterResponse, error) {
	var user models.User

	if result := s.H.DB.Where(&models.User{Email: req.Email}).First(&user); result.Error == nil {
		return nil, status.Error(codes.AlreadyExists, "Email already in use")
	}

	user.Email = req.Email
	user.Password = utils.HashPassword(req.Password)

	if s.H.DB.Create(&user).Error != nil {
		return nil, status.Error(codes.Internal, "Internal Server Error")
	}

	return &auth_proto.RegisterResponse{
		Message: "Created",
	}, nil
}

func (s *AuthServer) Login(ctx context.Context, req *auth_proto.LoginRequest) (*auth_proto.LoginResponse, error) {
	var user models.User

	if result := s.H.DB.Where(&models.User{Email: req.Email}).First(&user); result.Error != nil {
		return nil, status.Error(codes.NotFound, "User not found")
	}

	match := utils.CheckPasswordHash(req.Password, user.Password)

	if !match {
		return nil, status.Error(codes.Unauthenticated, "Invalid credentials")
	}

	token, _ := s.Jwt.GenerateToken(user)

	return &auth_proto.LoginResponse{
		UserId: user.UUID.String(),
		Token:  token,
	}, nil
}

func (s *AuthServer) Validate(ctx context.Context, req *auth_proto.ValidateRequest) (*auth_proto.ValidateResponse, error) {
	claims, err := s.Jwt.ValidateToken(req.Token)

	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "Invalid JWT")
	}

	var user models.User

	if result := s.H.DB.Where(&models.User{Email: claims.Email}).First(&user); result.Error != nil {
		return nil, status.Error(codes.NotFound, "User not found")
	}

	return &auth_proto.ValidateResponse{
		UserId: user.UUID.String(),
	}, nil
}
