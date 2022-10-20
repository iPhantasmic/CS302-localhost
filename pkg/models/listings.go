package models

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
	"time"
)

type Listing struct {
	UUID      uuid.UUID `json:"uuid" gorm:"type:uuid;primaryKey;<-:create;"`
	UserId    string    `json:"user_id" gorm:"not null" validate:"required"`
	Title     string    `json:"title" gorm:"not null" validate:"required"`
	Price     uint32    `json:"price" gorm:"not null" validate:"required"`
	Images    string    `json:"image" gorm:"not null"`
	Type      string    `json:"type" gorm:"not null" validate:"required"`
	Address   string    `json:"address" gorm:"not null" validate:"required"`
	Country   string    `json:"country" gorm:"not null" validate:"required"`
	City      string    `json:"city" gorm:"not null" validate:"required"`
	Rooms     uint32    `json:"rooms" gorm:"not null" validate:"required,min=1"`
	Beds      uint32    `json:"beds" gorm:"not null" validate:"required,min=1"`
	CreatedAt time.Time
}

func (listing *Listing) BeforeCreate(tx *gorm.DB) (err error) {
	listing.UUID, err = uuid.NewV4()
	return
}
