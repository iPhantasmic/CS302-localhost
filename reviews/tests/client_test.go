package tests

import (
	"github.com/stretchr/testify/suite"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/reviews/pkg/pb/reviews"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
	"testing"
)

type ServiceClientTestSuite struct {
	Client reviews_proto.ReviewServiceClient
	gormDB *gorm.DB
	suite.Suite
}

func (c *ServiceClientTestSuite) SetupSuite() {
	connUrl := os.Getenv("REVIEW_SVC")
	//connUrl := "127.0.0.1:50051"
	conn, err := grpc.Dial(connUrl, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal("Could not connect to Reviews service:", err)
	}

	c.Client = reviews_proto.NewReviewServiceClient(conn)

	dbUrl := os.Getenv("DB_CONN")
	//dbUrl := "postgres://admin:100600@127.0.0.1:5432/localhost_reviews"
	dbConn, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		log.Fatal("Could not connect to Reviews DB:", err)
	}

	c.gormDB = dbConn
}

func TestReviewsServiceTestSuite(t *testing.T) {
	suite.Run(t, &ServiceClientTestSuite{})
}

func (c *ServiceClientTestSuite) SetupTest() {
	reviews := []models.Review{
		{
			UserId:    "2fa05c14-9ca3-4598-b443-c4a71d0c7c40",
			ListingId: "d3f6b249-82a5-4a71-96e7-55437340240f",
			Rating:    5,
			Review:    "Host was really nice to me and place was great",
		},
		{
			UserId:    "7b243084-52fd-4dcd-9540-81732b35fa5b",
			ListingId: "36186786-5d8e-4483-913a-87df31cab7f9",
			Rating:    1,
			Review:    "Host was really mean to me.",
		},
		{
			UserId:    "e3b9b623-8b11-48e5-aa01-83f2e5795fe3",
			ListingId: "36186786-5d8e-4483-913a-87df31cab7f9",
			Rating:    3,
			Review:    "Quite the average place.",
		},
	}

	c.gormDB.Create(&reviews)
}

func (c *ServiceClientTestSuite) TearDownTest() {
	// clear DB
	c.gormDB.Where("1 = 1").Delete(&models.Review{})
}
