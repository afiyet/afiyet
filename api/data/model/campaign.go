package model

import (
	"gorm.io/gorm"
	"time"
)

type Campaign struct {
	ID           uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt    time.Time      `json:"createdAt,omitempty"`
	UpdatedAt    time.Time      `json:"updatedAt,omitempty"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	RestaurantId string         `json:"restaurantId"`
	Restaurant   Restaurant     `gorm:"foreignKey:RestaurantId" json:"restaurant,omitempty"`
	Picture      string         `json:"picture"`
}
