package tests

import (
	"context"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/pb/reviews"
)

func (c *ServiceClientTestSuite) TestReviewsService_GetReviewById() {
	var testReview models.Review
	c.gormDB.First(&testReview)

	uuid := testReview.UUID.String()
	request := &reviews_proto.GetReviewRequest{ReviewId: uuid}

	response, err := c.Client.GetReview(context.Background(), request)
	c.Assert().NoError(err)
	c.Assert().Equal(uuid, response.ReviewId)
	c.Assert().Equal(testReview.Review, response.Review)
	c.Assert().Equal(testReview.ListingId, response.ListingId)
	c.Assert().Equal(testReview.UserId, response.UserId)
	c.Assert().Equal(testReview.Rating, response.Rating)
}

func (c *ServiceClientTestSuite) TestReviewsService_CreateReview() {
	newReview := &reviews_proto.CreateReviewRequest{
		UserId:    "4cc9ee60-b8c3-47ee-ba02-44cab7d960c2",
		ListingId: "0e2c4de5-31fb-49e8-8ad9-31140ec0b191",
		Rating:    4,
		Review:    "Wow this is a great place!",
	}

	response, err := c.Client.CreateReview(context.Background(), newReview)
	c.Assert().NoError(err)
	c.Assert().Equal(newReview.UserId, response.UserId)
	c.Assert().Equal(newReview.ListingId, response.ListingId)
	c.Assert().Equal(newReview.Rating, response.Rating)
	c.Assert().Equal(newReview.Review, response.Review)
}

func (c *ServiceClientTestSuite) TestReviewsService_DeleteReviewById() {
	var testReview models.Review
	c.gormDB.First(&testReview)

	uuid := testReview.UUID.String()
	request := &reviews_proto.DeleteReviewRequest{ReviewId: uuid}

	response, err := c.Client.DeleteReview(context.Background(), request)
	c.Assert().NoError(err)
	c.Assert().Equal(response.Message, "Deleted")
}
