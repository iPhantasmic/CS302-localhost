package tests

import (
	"github.com/stretchr/testify/suite"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/auth"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/users"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
	"testing"
)

type ServiceClientTestSuite struct {
	authClient auth_proto.AuthServiceClient
	userClient users_proto.UserServiceClient
	gormDB     *gorm.DB
	suite.Suite
}

func (c *ServiceClientTestSuite) SetupSuite() {
	connUrl := os.Getenv("AUTH_SVC")
	conn, err := grpc.Dial(connUrl, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal("Could not connect to Auth/User service:", err)
	}

	c.authClient = auth_proto.NewAuthServiceClient(conn)
	c.userClient = users_proto.NewUserServiceClient(conn)

	dbUrl := os.Getenv("DB_CONN")
	dbConn, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		log.Fatal("Could not connect to Users DB:", err)
	}

	c.gormDB = dbConn
}

func TestAuthServiceTestSuite(t *testing.T) {
	suite.Run(t, &ServiceClientTestSuite{})
}

func (c *ServiceClientTestSuite) SetupTest() {
	users := []models.User{
		{
			Email:    "test@gmail.com",
			Password: "$2a$05$TvdiHwhx1Vnmh3yF/Ap.k.BU3EludY.vmOfBCzyzFfRq8vD4QTTrG",
		},
		{
			Email:    "test@scis.smu.edu.sg",
			Password: "$2a$05$RV4POxmlGCAKt9n4uQZlqug6AVgkrRwyKDDoCDk8vot70KB1w5vi6",
		},
		{
			Email:    "goat@bahbah.com",
			Password: "$2a$05$0lVxBMTyROdGJDknxl8KeO8JKLNcX7bMUzs/aL2U3dw4GNWdAe56u",
		},
	}

	c.gormDB.Create(&users)
}

func (c *ServiceClientTestSuite) TearDownTest() {
	// clear DB
	c.gormDB.Where("1 = 1").Delete(&models.User{})
}
