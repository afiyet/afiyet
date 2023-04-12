package model

import (
	"time"

	"gorm.io/gorm"
)

type Table struct {
	ID           uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt    time.Time      `json:"createdAt,omitempty"`
	UpdatedAt    time.Time      `json:"updatedAt,omitempty"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Name         string         `json:"name"`
	Orders       []Order        `gorm:"-" json:"orders,omitempty"`
	RestaurantId string         `json:"restaurantId"`
	Restaurant   Restaurant     `gorm:"foreignKey:RestaurantId" json:"restaurant,omitempty"`
}
