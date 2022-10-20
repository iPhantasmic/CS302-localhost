package db

import (
	"fmt"
	"log"

	"gitlab.com/cs302-2022/g2-team3/services/listings/pkg/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Handler struct {
	DB *gorm.DB
}

func Init(url string, schema string) Handler {
	db, err := gorm.Open(postgres.Open(url+"/postgres"), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	// check if db exists
	stmt := fmt.Sprintf("SELECT * FROM pg_database WHERE datname = '%s';", schema)
	result := db.Exec(stmt)
	if result.Error != nil {
		log.Fatalln(result.Error)
	}

	// db does not exist, create it
	if result.RowsAffected != 1 {
		db.Exec(fmt.Sprintf("CREATE DATABASE %s;", schema))
		db, err = gorm.Open(postgres.Open(url+"/"+schema), &gorm.Config{})
		if err != nil {
			log.Fatalln(err)
		}
	}

	err = db.AutoMigrate(&models.Listing{})
	if err != nil {
		panic(err)
	}

	return Handler{db}
}
