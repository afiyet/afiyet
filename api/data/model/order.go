package model

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	ID           uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt    time.Time      `json:"createdAt,omitempty"`
	UpdatedAt    time.Time      `json:"updatedAt,omitempty"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Dishes       []Dish         `gorm:"-" json:"dishes,omitempty"`
	TableId      string         `json:"tabelId,omitempty"`
	Table        Table          `gorm:"foreignKey:TableId" json:"table,omitempty"`
	RestaurantId string         `json:"restaurantId,omitempty"`
	Restaurant   Restaurant     `gorm:"foreignKey:RestaurantId" json:"restaurant,omitempty"`
}
