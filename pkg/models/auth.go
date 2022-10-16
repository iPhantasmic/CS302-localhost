package models

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type User struct {
	UUID     uuid.UUID `json:"uuid" gorm:"type:uuid;primaryKey;<-:create;"`
	Email    string    `json:"email" gorm:"unique;not null"`
	Password string    `json:"password" gorm:"not null"`
}

func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	user.UUID, err = uuid.NewV4()
	return
}
