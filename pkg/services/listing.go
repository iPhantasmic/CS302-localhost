package services

import (
	"bytes"
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/go-playground/validator/v10"
	"github.com/gofrs/uuid"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/config"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/db"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/pb/bookings"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/pb/listings"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"net/url"
	"strconv"
)

var validate = validator.New()

type ListingServer struct {
	H db.Handler
	C config.Config
	B bookings_proto.BookingServiceClient
	listings_proto.UnimplementedListingServiceServer
}

func (s *ListingServer) GetListing(ctx context.Context, req *listings_proto.GetListingRequest) (*listings_proto.Listing, error) {
	var listing models.Listing
	reqUuid := uuid.FromStringOrNil(req.GetListingId())

	if result := s.H.DB.Where(&models.Listing{UUID: reqUuid}).First(&listing); reqUuid == uuid.Nil || result.Error != nil {
		return nil, status.Error(codes.NotFound, "Listing not found")
	}

	return &listings_proto.Listing{
		ListingId: listing.UUID.String(),
		UserId:    listing.UserId,
		Title:     listing.Title,
		Price:     listing.Price,
		Images:    listing.Images,
		Type:      listings_proto.Type(listings_proto.Type_value[listing.Type]),
		Address:   listing.Address,
		Country:   listing.Country,
		City:      listing.City,
		Rooms:     listing.Rooms,
		StartDate: timestamppb.New(listing.StartDate),
		CreatedAt: timestamppb.New(listing.CreatedAt),
	}, nil
}

func (s *ListingServer) GetAllListings(ctx context.Context, req *emptypb.Empty) (*listings_proto.Listings, error) {
	var listingsDb []models.Listing

	if result := s.H.DB.Find(&listingsDb); result.Error != nil {
		return nil, status.Error(codes.Internal, "Failed to get all Listings")
	}

	var listingsGrpc []*listings_proto.Listing
	for _, listing := range listingsDb {
		listingsGrpc = append(listingsGrpc, &listings_proto.Listing{
			ListingId: listing.UUID.String(),
			UserId:    listing.UserId,
			Title:     listing.Title,
			Price:     listing.Price,
			Images:    listing.Images,
			Type:      listings_proto.Type(listings_proto.Type_value[listing.Type]),
			Address:   listing.Address,
			Country:   listing.Country,
			City:      listing.City,
			Rooms:     listing.Rooms,
			StartDate: timestamppb.New(listing.StartDate),
			CreatedAt: timestamppb.New(listing.CreatedAt),
		})
	}

	return &listings_proto.Listings{
		Listings: listingsGrpc,
	}, nil
}

func (s *ListingServer) GetAvailableListings(ctx context.Context, req *listings_proto.FilterLocationRoomRequest) (*listings_proto.Listings, error) {
	var listingsDb []models.Listing
	unavailableListings := req.GetListings()
	if req.GetCountry() == "" {
		return nil, status.Error(codes.InvalidArgument, "Invalid country")
	}
	countryQuery := "%" + req.GetCountry() + "%"
	cityQuery := "%" + req.GetCity() + "%"

	if req.GetCity() == "" && req.GetRooms() == 0 {
		// filter by country
		if result := s.H.DB.Where("uuid NOT IN ? AND country LIKE ?", unavailableListings, countryQuery).Find(&listingsDb); result.Error != nil || result.RowsAffected == 0 {
		}
	} else if req.GetCity() == "" && req.GetRooms() > 0 {
		// filter by country and rooms
		if result := s.H.DB.Where("uuid NOT IN ? AND country LIKE ? AND rooms = ?", unavailableListings, countryQuery, strconv.FormatUint(uint64(req.GetRooms()), 10)).Find(&listingsDb); result.Error != nil || result.RowsAffected == 0 {
		}
	} else if req.GetRooms() < 1 && req.GetCity() != "" {
		// filter by country and city
		if result := s.H.DB.Where("uuid NOT IN ? AND country LIKE ? AND city LIKE ?", unavailableListings, countryQuery, cityQuery).Find(&listingsDb); result.Error != nil || result.RowsAffected == 0 {
		}
	} else {
		// filter by country, rooms and city
		if result := s.H.DB.Where("uuid NOT IN ? AND country LIKE ? AND city LIKE ? AND rooms = ?", unavailableListings, countryQuery, cityQuery, strconv.FormatUint(uint64(req.GetRooms()), 10)).Find(&listingsDb); result.Error != nil || result.RowsAffected == 0 {
		}
	}

	var listingsGrpc []*listings_proto.Listing
	for _, listing := range listingsDb {
		listingsGrpc = append(listingsGrpc, &listings_proto.Listing{
			ListingId: listing.UUID.String(),
			UserId:    listing.UserId,
			Title:     listing.Title,
			Price:     listing.Price,
			Images:    listing.Images,
			Type:      listings_proto.Type(listings_proto.Type_value[listing.Type]),
			Address:   listing.Address,
			Country:   listing.Country,
			City:      listing.City,
			Rooms:     listing.Rooms,
			StartDate: timestamppb.New(listing.StartDate),
			CreatedAt: timestamppb.New(listing.CreatedAt),
		})
	}

	return &listings_proto.Listings{
		Listings: listingsGrpc,
	}, nil
}

func (s *ListingServer) CreateListing(ctx context.Context, req *listings_proto.CreateListingRequest) (*listings_proto.Listing, error) {
	var listing models.Listing

	listing.UserId = req.UserId
	listing.Title = req.Title
	listing.Price = req.Price
	listing.Type = req.Type.String()
	listing.Address = req.Address
	listing.Country = req.Country
	listing.City = req.City
	listing.Rooms = req.Rooms
	listing.StartDate = req.StartDate.AsTime()
	listing.Images = []string{}

	err := validate.Struct(listing)
	if err != nil {
		fmt.Println(err)
		return nil, status.Error(codes.InvalidArgument, "Invalid listing")
	}

	result := s.H.DB.Create(&listing)
	if result.Error != nil {
		return nil, status.Error(codes.Internal, "Listing could not be created")
	}

	// create AWS uploader
	s3Config := &aws.Config{
		Region:      aws.String("ap-southeast-1"),
		Credentials: credentials.NewStaticCredentials(s.C.AWSKeyID, s.C.AWSSecret, ""),
	}
	s3Session, err := session.NewSession(s3Config)
	if err != nil {
		return nil, status.Error(codes.Internal, "Invalid S3 credentials")
	}
	s3client := s3.New(s3Session)
	uploader := s3manager.NewUploader(s3Session)

	// validate images
	var tmp [3]string
	if len(req.Images) != 3 {
		return nil, status.Error(codes.InvalidArgument, "3 images required")
	}

	for i, image := range req.Images {
		input := &s3manager.UploadInput{
			Bucket:      aws.String("cs302-localhost"),                                        // bucket's name
			Key:         aws.String("images/" + listing.UUID.String() + "/" + image.Filename), // files destination location
			Body:        bytes.NewReader(image.Data),                                          // content of the file
			ContentType: aws.String("image/jpg"),                                              // content type
			ACL:         aws.String("public-read"),
		}
		output, err := uploader.Upload(input)
		if err == nil {
			tmp[i] = output.Location
		}
	}

	for _, s3Url := range tmp {
		listing.Images = append(listing.Images, s3Url)
	}

	result = s.H.DB.Save(&listing)
	if result.Error != nil {
		for _, s3Url := range listing.Images {
			tmp, _ := url.Parse(s3Url)
			toDel := tmp.EscapedPath()[1:]
			_, _ = s3client.DeleteObject(&s3.DeleteObjectInput{
				Bucket: aws.String(s.C.AWSBucket),
				Key:    aws.String(toDel),
			})
		}
		return nil, status.Error(codes.Internal, "Listing could not be created")
	}

	return &listings_proto.Listing{
		ListingId: listing.UUID.String(),
		UserId:    listing.UserId,
		Title:     listing.Title,
		Price:     listing.Price,
		Images:    listing.Images,
		Type:      listings_proto.Type(listings_proto.Type_value[listing.Type]),
		Address:   listing.Address,
		Country:   listing.Country,
		City:      listing.City,
		Rooms:     listing.Rooms,
		StartDate: timestamppb.New(listing.StartDate),
		CreatedAt: timestamppb.New(listing.CreatedAt),
	}, nil
}

func (s *ListingServer) UpdateListing(ctx context.Context, req *listings_proto.UpdateListingRequest) (*listings_proto.Listing, error) {
	var listing models.Listing
	reqUuid := uuid.FromStringOrNil(req.GetListingId())

	if result := s.H.DB.Where(&models.Listing{UUID: reqUuid}).First(&listing); reqUuid == uuid.Nil || result.Error != nil {
		return nil, status.Error(codes.NotFound, "Listing not found")
	}

	listing.Title = req.Title
	listing.Price = req.Price
	listing.Type = req.Type.String()
	listing.Address = req.Address
	listing.Country = req.Country
	listing.City = req.City
	listing.Rooms = req.Rooms
	listing.StartDate = req.StartDate.AsTime()

	err := validate.Struct(listing)
	if err != nil {
		fmt.Println(err)
		return nil, status.Error(codes.InvalidArgument, "Invalid listing")
	}

	// validate images
	if len(req.Images) != 3 {
		return nil, status.Error(codes.InvalidArgument, "3 images required")
	}

	// create AWS uploader
	s3Config := &aws.Config{
		Region:      aws.String("ap-southeast-1"),
		Credentials: credentials.NewStaticCredentials(s.C.AWSKeyID, s.C.AWSSecret, ""),
	}
	s3Session, err := session.NewSession(s3Config)
	if err != nil {
		return nil, status.Error(codes.Internal, "Invalid S3 credentials")
	}
	s3client := s3.New(s3Session)
	uploader := s3manager.NewUploader(s3Session)

	// upload new images
	tmp := make([]string, 3)
	for i, image := range req.Images {
		input := &s3manager.UploadInput{
			Bucket:      aws.String("cs302-localhost"),                                        // bucket's name
			Key:         aws.String("images/" + listing.UUID.String() + "/" + image.Filename), // files destination location
			Body:        bytes.NewReader(image.Data),                                          // content of the file
			ContentType: aws.String("image/jpg"),                                              // content type
			ACL:         aws.String("public-read"),
		}
		output, err := uploader.Upload(input)
		if err == nil {
			tmp[i] = output.Location
		}
	}

	urls := make([]string, 3)
	copy(urls, listing.Images)
	copy(listing.Images, tmp)

	result := s.H.DB.Save(&listing)
	if result.Error != nil {
		// undo upload
		for _, s3Url := range tmp {
			raw, _ := url.Parse(s3Url)
			toDel := raw.EscapedPath()[1:]
			_, _ = s3client.DeleteObject(&s3.DeleteObjectInput{
				Bucket: aws.String(s.C.AWSBucket),
				Key:    aws.String(toDel),
			})
		}
		return nil, status.Error(codes.Internal, "Listing could not be updated")
	}

	// delete current images
	fmt.Println(len(urls))
	for i, s3Url := range urls {
		parseOld, _ := url.Parse(s3Url)
		toDel := parseOld.EscapedPath()[1:]
		fmt.Println(s3Url)
		fmt.Println(toDel)
		parseNew, _ := url.Parse(tmp[i])
		current := parseNew.EscapedPath()[1:]
		if toDel == current {
			continue
		}
		_, _ = s3client.DeleteObject(&s3.DeleteObjectInput{
			Bucket: aws.String(s.C.AWSBucket),
			Key:    aws.String(toDel),
		})
	}

	return &listings_proto.Listing{
		ListingId: listing.UUID.String(),
		UserId:    listing.UserId,
		Title:     listing.Title,
		Price:     listing.Price,
		Images:    listing.Images,
		Type:      listings_proto.Type(listings_proto.Type_value[listing.Type]),
		Address:   listing.Address,
		Country:   listing.Country,
		City:      listing.City,
		Rooms:     listing.Rooms,
		StartDate: timestamppb.New(listing.StartDate),
		CreatedAt: timestamppb.New(listing.CreatedAt),
	}, nil
}

func (s *ListingServer) DeleteListing(ctx context.Context, req *listings_proto.DeleteListingRequest) (*listings_proto.DeleteListingResponse, error) {
	var listing models.Listing
	reqUuid := uuid.FromStringOrNil(req.GetListingId())

	if result := s.H.DB.Where(&models.Listing{UUID: reqUuid}).First(&listing); reqUuid == uuid.Nil || result.Error != nil {
		return nil, status.Error(codes.NotFound, "Listing not found")
	}

	// create AWS client
	s3Config := &aws.Config{
		Region:      aws.String("ap-southeast-1"),
		Credentials: credentials.NewStaticCredentials(s.C.AWSKeyID, s.C.AWSSecret, ""),
	}
	s3Session, err := session.NewSession(s3Config)
	if err != nil {
		return nil, status.Error(codes.Internal, "Invalid S3 credentials")
	}
	s3client := s3.New(s3Session)

	for _, s3Url := range listing.Images {
		tmp, _ := url.Parse(s3Url)
		toDel := tmp.EscapedPath()[1:]
		_, _ = s3client.DeleteObject(&s3.DeleteObjectInput{
			Bucket: aws.String(s.C.AWSBucket),
			Key:    aws.String(toDel),
		})
	}

	s.H.DB.Delete(&listing)

	return &listings_proto.DeleteListingResponse{
		Message: "Deleted",
	}, nil
}
