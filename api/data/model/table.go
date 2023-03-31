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
	Name         string         `gorm:"index:uniqueresttable,unique" json:"name"`
	Orders       []Order        `gorm:"-" json:"orders,omitempty"`
	RestaurantId string         `gorm:"index:uniqueresttable,unique" json:"restaurantId"`
	Restaurant   Restaurant     `gorm:"foreignKey:RestaurantId" json:"restaurant,omitempty"`
}
