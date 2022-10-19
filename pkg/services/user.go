package services

import (
	"context"
	"github.com/gofrs/uuid"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/utils"
	"net/http"

	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/db"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/users"
)

type UserServer struct {
	H db.Handler
	users_proto.UnimplementedUserServiceServer
}

func (s *UserServer) GetUser(ctx context.Context, req *users_proto.GetUserRequest) (*users_proto.GetUserResponse, error) {
	var user models.User
	reqUuid := uuid.FromStringOrNil(req.GetUserId())

	if result := s.H.DB.Where(&models.User{UUID: reqUuid}).First(&user); reqUuid == uuid.Nil || result.Error != nil {
		return &users_proto.GetUserResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
		}, nil
	}

	return &users_proto.GetUserResponse{
		Status: http.StatusOK,
		UserId: user.UUID.String(),
		Email:  user.Email,
	}, nil
}

func (s *UserServer) UpdateUser(ctx context.Context, req *users_proto.UpdateUserRequest) (*users_proto.UpdateUserResponse, error) {
	var user models.User
	var temp models.User
	reqUuid := uuid.FromStringOrNil(req.GetUserId())

	if result := s.H.DB.Where(&models.User{UUID: reqUuid}).First(&user); reqUuid == uuid.Nil || result.Error != nil {
		return &users_proto.UpdateUserResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
		}, nil
	}

	if result := s.H.DB.Where(&models.User{Email: req.Email}).First(&temp); req.Email != user.Email && result.RowsAffected != 0 {
		return &users_proto.UpdateUserResponse{
			Status: http.StatusBadRequest,
			Error:  "Email already in use",
		}, nil
	}

	user.Email = req.Email

	if !utils.CheckPasswordHash(req.Password, user.Password) {
		user.Password = utils.HashPassword(req.Password)
	}

	s.H.DB.Save(&user)

	return &users_proto.UpdateUserResponse{
		Status: http.StatusOK,
		UserId: user.UUID.String(),
		Email:  user.Email,
	}, nil
}

func (s *UserServer) DeleteUser(ctx context.Context, req *users_proto.DeleteUserRequest) (*users_proto.DeleteUserResponse, error) {
	var user models.User
	reqUuid := uuid.FromStringOrNil(req.GetUserId())

	if result := s.H.DB.Where(&models.User{UUID: reqUuid}).First(&user); reqUuid == uuid.Nil || result.Error != nil {
		return &users_proto.DeleteUserResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
		}, nil
	}

	s.H.DB.Delete(&user)

	return &users_proto.DeleteUserResponse{
		Status: http.StatusOK,
	}, nil
}
