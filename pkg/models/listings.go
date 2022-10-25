package models

import (
	"github.com/gofrs/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
	"time"
)

type Listing struct {
	UUID      uuid.UUID      `json:"uuid" gorm:"type:uuid;primaryKey;<-:create;"`
	UserId    string         `json:"user_id" gorm:"not null" validate:"required"`
	Title     string         `json:"title" gorm:"not null" validate:"required"`
	Price     uint32         `json:"price" gorm:"not null" validate:"required"`
	Images    pq.StringArray `json:"image" gorm:"type:text[];not null"`
	Type      string         `json:"type" gorm:"not null" validate:"required"`
	Address   string         `json:"address" gorm:"not null" validate:"required"`
	Country   string         `json:"country" gorm:"not null" validate:"required"`
	City      string         `json:"city" gorm:"not null" validate:"required"`
	Rooms     uint32         `json:"rooms" gorm:"not null" validate:"required,min=1"`
	StartDate time.Time      `json:"start_date" gorm:"not null" validate:"required"`
	CreatedAt time.Time
}

func (listing *Listing) BeforeCreate(tx *gorm.DB) (err error) {
	listing.UUID, err = uuid.NewV4()
	return
}
