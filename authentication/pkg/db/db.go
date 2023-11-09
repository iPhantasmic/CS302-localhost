package db

import (
	"log"

	"gitlab.com/cs302-2022/g2-team3/services/authentication/pkg/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Handler struct {
	DB *gorm.DB
}

func Init(url string) Handler {
	db, err := gorm.Open(postgres.Open(url), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	err = db.AutoMigrate(&models.User{})
	if err != nil {
		panic(err)
	}

	return Handler{db}
}
