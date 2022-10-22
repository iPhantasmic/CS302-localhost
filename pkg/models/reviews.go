package models

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
	"time"
)

type Review struct {
	UUID      uuid.UUID `json:"uuid" gorm:"type:uuid;primaryKey;<-:create;"`
	UserId    string    `json:"user_id" gorm:"not null" validate:"required"`
	ListingId string    `json:"listing_id" gorm:"not null" validate:"required"`
	Rating    uint32    `json:"rating" gorm:"not null" validate:"required,min=0,max=5"`
	Review    string    `json:"review" gorm:"not null" validate:"required"`
	CreatedAt time.Time
}

func (review *Review) BeforeCreate(tx *gorm.DB) (err error) {
	review.UUID, err = uuid.NewV4()
	return
}
