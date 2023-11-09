package tests

import (
	"github.com/stretchr/testify/suite"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/pb/listings"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
	"testing"
	"time"
)

type ServiceClientTestSuite struct {
	Client listings_proto.ListingServiceClient
	gormDB *gorm.DB
	suite.Suite
}

func (c *ServiceClientTestSuite) SetupSuite() {
	connUrl := os.Getenv("LISTING_SVC")
	//connUrl := "127.0.0.1:50051"
	conn, err := grpc.Dial(connUrl, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal("Could not connect to Listings service:", err)
	}

	c.Client = listings_proto.NewListingServiceClient(conn)

	dbUrl := os.Getenv("DB_CONN")
	//dbUrl := "postgres://admin:100600@127.0.0.1:5432/localhost_listings"
	dbConn, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		log.Fatal("Could not connect to Listings DB:", err)
	}

	c.gormDB = dbConn
}

func TestListingsServiceTestSuite(t *testing.T) {
	suite.Run(t, &ServiceClientTestSuite{})
}

func (c *ServiceClientTestSuite) SetupTest() {
	listings := []models.Listing{
		{
			UserId:    "24ddc729-3046-4683-b00f-317fb5a8a0b7",
			Title:     "Listing1",
			Price:     50,
			Images:    []string{"test1", "test2", "test3"},
			Type:      "TYPE_ROOM",
			Address:   "80 Stamford Road",
			Country:   "Singapore",
			City:      "Singapore",
			Rooms:     3,
			StartDate: time.Now(),
		},
		{
			UserId:    "a93a60f0-5678-4526-a22f-606b670f6c52",
			Title:     "Listing2",
			Price:     50,
			Images:    []string{"test1", "test2", "test3"},
			Type:      "TYPE_ROOM",
			Address:   "90 Stamford Road",
			Country:   "Malaysia",
			City:      "JB",
			Rooms:     1,
			StartDate: time.Now(),
		},
	}

	c.gormDB.Create(&listings)
}

func (c *ServiceClientTestSuite) TearDownTest() {
	// clear DB
	c.gormDB.Where("1 = 1").Delete(&models.Listing{})
}
