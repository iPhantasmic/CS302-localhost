package tests

import (
	"context"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/pb/listings"
	"google.golang.org/protobuf/types/known/emptypb"
)

func (c *ServiceClientTestSuite) TestListingsService_GetListingById() {
	var testListing models.Listing
	c.gormDB.First(&testListing)

	uuid := testListing.UUID.String()
	request := &listings_proto.GetListingRequest{ListingId: uuid}

	response, err := c.Client.GetListing(context.Background(), request)
	c.Assert().NoError(err)
	c.Assert().Equal(uuid, response.ListingId)
	c.Assert().Equal(testListing.UserId, response.UserId)
	c.Assert().Equal(testListing.Title, response.Title)
	c.Assert().Equal(testListing.Price, response.Price)
	c.Assert().Equal(testListing.Type, response.Type.String())
	c.Assert().Equal(testListing.Address, response.Address)
	c.Assert().Equal(testListing.Country, response.Country)
	c.Assert().Equal(testListing.City, response.City)
	c.Assert().Equal(testListing.Rooms, response.Rooms)
	c.Assert().Equal(testListing.StartDate, response.StartDate.AsTime().Local())
}

func (c *ServiceClientTestSuite) TestListingsService_GetAllListings() {
	var testListings []models.Listing
	c.gormDB.Find(&testListings)
	listing1 := testListings[0]
	listing2 := testListings[1]

	response, err := c.Client.GetAllListings(context.Background(), &emptypb.Empty{})
	responseListings := response.GetListings()
	responseListing1 := responseListings[0]
	responseListing2 := responseListings[1]
	c.Assert().NoError(err)
	c.Assert().Equal(listing1.UUID.String(), responseListing1.ListingId)
	c.Assert().Equal(listing1.UserId, responseListing1.UserId)
	c.Assert().Equal(listing1.Title, responseListing1.Title)
	c.Assert().Equal(listing1.Price, responseListing1.Price)
	c.Assert().Equal(listing1.Type, responseListing1.Type.String())
	c.Assert().Equal(listing1.Address, responseListing1.Address)
	c.Assert().Equal(listing1.Country, responseListing1.Country)
	c.Assert().Equal(listing1.City, responseListing1.City)
	c.Assert().Equal(listing1.Rooms, responseListing1.Rooms)
	c.Assert().Equal(listing1.StartDate, responseListing1.StartDate.AsTime().Local())

	c.Assert().Equal(listing2.UUID.String(), responseListing2.ListingId)
	c.Assert().Equal(listing2.UserId, responseListing2.UserId)
	c.Assert().Equal(listing2.Title, responseListing2.Title)
	c.Assert().Equal(listing2.Price, responseListing2.Price)
	c.Assert().Equal(listing2.Type, responseListing2.Type.String())
	c.Assert().Equal(listing2.Address, responseListing2.Address)
	c.Assert().Equal(listing2.Country, responseListing2.Country)
	c.Assert().Equal(listing2.City, responseListing2.City)
	c.Assert().Equal(listing2.Rooms, responseListing2.Rooms)
	c.Assert().Equal(listing2.StartDate, responseListing2.StartDate.AsTime().Local())
}

func (c *ServiceClientTestSuite) TestListingsService_GetAvailableListings() {
	var testListing models.Listing
	c.gormDB.Where("country = ?", "Singapore").First(&testListing)

	request := &listings_proto.FilterLocationRoomRequest{
		Listings: []string{"00000000-0000-0000-0000-000000000000"},
		Country:  "Singapore",
		City:     "Singapore",
		Rooms:    0,
	}

	response, err := c.Client.GetAvailableListings(context.Background(), request)
	responseListings := response.GetListings()
	responseListing := responseListings[0]
	c.Assert().NoError(err)
	c.Assert().Equal(testListing.UUID.String(), responseListing.ListingId)
	c.Assert().Equal(testListing.UserId, responseListing.UserId)
	c.Assert().Equal(testListing.Title, responseListing.Title)
	c.Assert().Equal(testListing.Price, responseListing.Price)
	c.Assert().Equal(testListing.Type, responseListing.Type.String())
	c.Assert().Equal(testListing.Address, responseListing.Address)
	c.Assert().Equal(testListing.Country, responseListing.Country)
	c.Assert().Equal(testListing.City, responseListing.City)
	c.Assert().Equal(testListing.Rooms, responseListing.Rooms)
	c.Assert().Equal(testListing.StartDate, responseListing.StartDate.AsTime().Local())
}

func (c *ServiceClientTestSuite) TestListingsService_DeleteListingById() {
	var testListing models.Listing
	c.gormDB.First(&testListing)

	uuid := testListing.UUID.String()
	request := &listings_proto.DeleteListingRequest{ListingId: uuid}

	response, err := c.Client.DeleteListing(context.Background(), request)
	c.Assert().NoError(err)
	c.Assert().Equal(response.Message, "Deleted")
}
