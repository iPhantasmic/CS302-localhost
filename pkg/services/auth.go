package services

import (
	"context"
	"net/http"

	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/db"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/auth"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/utils"
)

type AuthServer struct {
	H   db.Handler
	Jwt utils.JwtWrapper
	auth_proto.UnimplementedAuthServiceServer
}

func (s *AuthServer) Register(ctx context.Context, req *auth_proto.RegisterRequest) (*auth_proto.RegisterResponse, error) {
	var user models.User

	if result := s.H.DB.Where(&models.User{Email: req.Email}).First(&user); result.Error == nil {
		return &auth_proto.RegisterResponse{
			Status: http.StatusConflict,
			Error:  "Email already exists",
		}, nil
	}

	user.Email = req.Email
	user.Password = utils.HashPassword(req.Password)

	if s.H.DB.Create(&user).Error != nil {
		return &auth_proto.RegisterResponse{
			Status: http.StatusInternalServerError,
		}, nil
	}

	return &auth_proto.RegisterResponse{
		Status: http.StatusCreated,
	}, nil
}

func (s *AuthServer) Login(ctx context.Context, req *auth_proto.LoginRequest) (*auth_proto.LoginResponse, error) {
	var user models.User

	if result := s.H.DB.Where(&models.User{Email: req.Email}).First(&user); result.Error != nil {
		return &auth_proto.LoginResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
		}, nil
	}

	match := utils.CheckPasswordHash(req.Password, user.Password)

	if !match {
		return &auth_proto.LoginResponse{
			Status: http.StatusUnauthorized,
			Error:  "Invalid credentials",
		}, nil
	}

	token, _ := s.Jwt.GenerateToken(user)

	return &auth_proto.LoginResponse{
		Status: http.StatusOK,
		Token:  token,
	}, nil
}

func (s *AuthServer) Validate(ctx context.Context, req *auth_proto.ValidateRequest) (*auth_proto.ValidateResponse, error) {
	claims, err := s.Jwt.ValidateToken(req.Token)

	if err != nil {
		return &auth_proto.ValidateResponse{
			Status: http.StatusBadRequest,
			Error:  "Invalid JWT",
			//Error:  err.Error(),
		}, nil
	}

	var user models.User

	if result := s.H.DB.Where(&models.User{Email: claims.Email}).First(&user); result.Error != nil {
		return &auth_proto.ValidateResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
		}, nil
	}

	return &auth_proto.ValidateResponse{
		Status: http.StatusOK,
		UserId: user.UUID.String(),
	}, nil
}
