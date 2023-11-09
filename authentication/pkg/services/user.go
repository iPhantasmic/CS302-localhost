package services

import (
	"context"
	"github.com/gofrs/uuid"
	log "github.com/sirupsen/logrus"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/db"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/users"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/utils"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserServer struct {
	H db.Handler
	users_proto.UnimplementedUserServiceServer
}

func (s *UserServer) GetUser(ctx context.Context, req *users_proto.GetUserRequest) (*users_proto.GetUserResponse, error) {
	var user models.User
	reqUuid := uuid.FromStringOrNil(req.GetUserId())

	if result := s.H.DB.Where(&models.User{UUID: reqUuid}).First(&user); reqUuid == uuid.Nil || result.Error != nil {
		log.WithFields(log.Fields{
			"userId": user.UUID.String(),
		}).Info("User not found")
		return nil, status.Error(codes.NotFound, "User not found")
	}

	return &users_proto.GetUserResponse{
		UserId: user.UUID.String(),
		Email:  user.Email,
	}, nil
}

func (s *UserServer) UpdateUser(ctx context.Context, req *users_proto.UpdateUserRequest) (*users_proto.UpdateUserResponse, error) {
	var user models.User
	var temp models.User
	reqUuid := uuid.FromStringOrNil(req.GetUserId())

	if result := s.H.DB.Where(&models.User{UUID: reqUuid}).First(&user); reqUuid == uuid.Nil || result.Error != nil {
		log.WithFields(log.Fields{
			"userId": user.UUID.String(),
		}).Info("User not found")
		return nil, status.Error(codes.NotFound, "User not found")
	}

	if result := s.H.DB.Where(&models.User{Email: req.Email}).First(&temp); req.Email != user.Email && result.RowsAffected != 0 {
		log.WithFields(log.Fields{
			"userId": user.UUID.String(),
		}).Info("UpdateUser email already in use")
		return nil, status.Error(codes.AlreadyExists, "Email already in use")
	}

	user.Email = req.Email

	if !utils.CheckPasswordHash(req.Password, user.Password) {
		user.Password = utils.HashPassword(req.Password)
	}

	s.H.DB.Save(&user)

	log.WithFields(log.Fields{
		"userId": user.UUID.String(),
	}).Info("User updated")

	return &users_proto.UpdateUserResponse{
		UserId: user.UUID.String(),
		Email:  user.Email,
	}, nil
}

func (s *UserServer) DeleteUser(ctx context.Context, req *users_proto.DeleteUserRequest) (*users_proto.DeleteUserResponse, error) {
	var user models.User
	reqUuid := uuid.FromStringOrNil(req.GetUserId())

	if result := s.H.DB.Where(&models.User{UUID: reqUuid}).First(&user); reqUuid == uuid.Nil || result.Error != nil {
		log.WithFields(log.Fields{
			"userId": user.UUID.String(),
		}).Info("User not found")
		return nil, status.Error(codes.NotFound, "User not found")
	}

	s.H.DB.Delete(&user)

	log.WithFields(log.Fields{
		"userId": user.UUID.String(),
	}).Info("User deleted")

	return &users_proto.DeleteUserResponse{
		Message: "Deleted",
	}, nil
}
