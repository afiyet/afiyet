package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt time.Time      `json:"createdAt,omitempty"`
	UpdatedAt time.Time      `json:"updatedAt,omitempty"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Name      string         `json:"name"`
	Surname   string         `json:"surname"`
	Mail      string         `gorm:"unique" json:"mail"`
	Rating    []Rating       `gorm:"-" json:"rating,omitempty"`
	Password string `json:"password"`
}
