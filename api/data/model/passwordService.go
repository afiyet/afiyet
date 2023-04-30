package model

import (
	"time"

	"gorm.io/gorm"
)

type PasswordChange struct {
	ID           uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt    time.Time      `json:"createdAt,omitempty"`
	UpdatedAt    time.Time      `json:"updatedAt,omitempty"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	RestaurantId uint           `json:"restaurantId"`
	UserId       uint           `json:"userId"`
	Email        string         `json:"email"`
	Body         string         `json:"body"`
	Password     string         `json:"password"`
	Token        string         `json:"token"`
	IsRestaurant bool           `json:"IsRestaurant"`
}
