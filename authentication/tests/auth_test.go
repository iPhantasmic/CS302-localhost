package tests

import (
	"context"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/models"
	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/auth"
	users_proto "gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/pb/users"
)

func (c *ServiceClientTestSuite) TestAuthService_RegisterUser() {
	newUser := &auth_proto.RegisterRequest{
		Email:    "another@gmail.com",
		Password: "123456",
	}

	response, err := c.authClient.Register(context.Background(), newUser)
	c.Assert().NoError(err)
	c.Assert().Equal("Created", response.Message)
}

func (c *ServiceClientTestSuite) TestAuthService_LoginValid() {
	var testUser models.User
	c.gormDB.First(&testUser, "email = ?", "goat@bahbah.com")

	login := &auth_proto.LoginRequest{
		Email:    "goat@bahbah.com",
		Password: "iamjdubs",
	}

	response, err := c.authClient.Login(context.Background(), login)
	c.Assert().NoError(err)
	c.Assert().Equal(testUser.UUID.String(), response.UserId)
}

func (c *ServiceClientTestSuite) TestAuthService_LoginInvalid() {
	var testUser models.User
	c.gormDB.First(&testUser)

	login := &auth_proto.LoginRequest{
		Email:    "test@gmail.com",
		Password: "000000",
	}

	response, err := c.authClient.Login(context.Background(), login)
	c.Assert().Error(err)
	c.Assert().Nil(response)
}

func (c *ServiceClientTestSuite) TestUserService_GetUserById() {
	var testUser models.User
	c.gormDB.First(&testUser)

	uuid := testUser.UUID.String()
	request := &users_proto.GetUserRequest{UserId: uuid}

	response, err := c.userClient.GetUser(context.Background(), request)
	c.Assert().NoError(err)
	c.Assert().Equal(uuid, response.UserId)
	c.Assert().Equal(testUser.Email, response.Email)
}

func (c *ServiceClientTestSuite) TestUserService_UpdateUserValid() {
	var testUser models.User
	c.gormDB.First(&testUser)

	uuid := testUser.UUID.String()
	request := &users_proto.UpdateUserRequest{
		UserId:   uuid,
		Email:    "valid@gmail.com",
		Password: "123456",
	}

	response, err := c.userClient.UpdateUser(context.Background(), request)
	c.Assert().NoError(err)
	c.Assert().Equal(uuid, response.UserId)
	c.Assert().Equal("valid@gmail.com", response.Email)
}

func (c *ServiceClientTestSuite) TestUserService_UpdateUserInvalid() {
	var testUser models.User
	c.gormDB.First(&testUser)

	uuid := testUser.UUID.String()
	request := &users_proto.UpdateUserRequest{
		UserId:   uuid,
		Email:    "goat@bahbah.com",
		Password: "123456",
	}

	response, err := c.userClient.UpdateUser(context.Background(), request)
	c.Assert().Error(err)
	c.Assert().Nil(response)
}

func (c *ServiceClientTestSuite) TestUserService_DeleteUser() {
	var testUser models.User
	c.gormDB.First(&testUser)

	uuid := testUser.UUID.String()
	request := &users_proto.DeleteUserRequest{UserId: uuid}

	response, err := c.userClient.DeleteUser(context.Background(), request)
	c.Assert().NoError(err)
	c.Assert().Equal(response.Message, "Deleted")
}
