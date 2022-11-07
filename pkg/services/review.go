package services

import (
	"context"
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/gofrs/uuid"
	log "github.com/sirupsen/logrus"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/db"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/pb/reviews"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

var validate = validator.New()

type ReviewServer struct {
	H db.Handler
	reviews_proto.UnimplementedReviewServiceServer
}

func (s *ReviewServer) GetReview(ctx context.Context, req *reviews_proto.GetReviewRequest) (*reviews_proto.GetReviewResponse, error) {
	var review models.Review
	reqUuid := uuid.FromStringOrNil(req.GetReviewId())

	if result := s.H.DB.Where(&models.Review{UUID: reqUuid}).First(&review); reqUuid == uuid.Nil || result.Error != nil {
		log.WithFields(log.Fields{
			"reviewId": review.UUID.String(),
		}).Info("Review not found")
		return nil, status.Error(codes.NotFound, "Review not found")
	}

	return &reviews_proto.GetReviewResponse{
		ReviewId:  review.UUID.String(),
		UserId:    review.UserId,
		ListingId: review.ListingId,
		Rating:    review.Rating,
		Review:    review.Review,
		CreatedAt: timestamppb.New(review.CreatedAt),
	}, nil
}

func (s *ReviewServer) CreateReview(ctx context.Context, req *reviews_proto.CreateReviewRequest) (*reviews_proto.CreateReviewResponse, error) {
	var review models.Review
	var temp models.Review

	if result := s.H.DB.Where(&models.Review{UserId: req.UserId, ListingId: req.ListingId}).First(&temp); result.RowsAffected != 0 {
		return nil, status.Error(codes.AlreadyExists, "Review already exists")
	}

	review.UserId = req.UserId
	review.ListingId = req.ListingId
	review.Rating = req.Rating
	review.Review = req.Review

	err := validate.Struct(review)
	if err != nil {
		log.Info("CreateReview invalid review")
		return nil, status.Error(codes.InvalidArgument, "Invalid review")
	}

	result := s.H.DB.Create(&review)
	if result.Error != nil {
		log.Error("Review could not be created")
		return nil, status.Error(codes.Internal, "Review could not be created")
	}

	log.WithFields(log.Fields{
		"reviewId": review.UUID.String(),
	}).Info("Review created")

	fmt.Println(1 / 0)

	return &reviews_proto.CreateReviewResponse{
		ReviewId:  review.UUID.String(),
		UserId:    review.UserId,
		ListingId: review.ListingId,
		Rating:    review.Rating,
		Review:    review.Review,
		CreatedAt: timestamppb.New(review.CreatedAt),
	}, nil
}

func (s *ReviewServer) DeleteReview(ctx context.Context, req *reviews_proto.DeleteReviewRequest) (*reviews_proto.DeleteReviewResponse, error) {
	var review models.Review
	reqUuid := uuid.FromStringOrNil(req.GetReviewId())

	if result := s.H.DB.Where(&models.Review{UUID: reqUuid}).First(&review); reqUuid == uuid.Nil || result.Error != nil {
		log.WithFields(log.Fields{
			"reviewId": review.UUID.String(),
		}).Info("Review not found")
		return nil, status.Error(codes.NotFound, "Review not found")
	}

	s.H.DB.Delete(&review)

	log.WithFields(log.Fields{
		"reviewId": review.UUID.String(),
	}).Info("Review deleted")

	return &reviews_proto.DeleteReviewResponse{
		Message: "Deleted",
	}, nil
}
