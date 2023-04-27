package model

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Dish struct {
	ID           uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt    time.Time      `json:"createdAt,omitempty"`
	UpdatedAt    time.Time      `json:"updatedAt,omitempty"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	RestaurantId string         `json:"restaurantId"`
	Restaurant   Restaurant     `gorm:"foreignKey:RestaurantId" json:"restaurant,omitempty"`
	Name         string         `json:"name,omitempty" json:"name"`
	Category     string         `json:"category"`
	Ingredients  pq.StringArray `gorm:"type:text[]" json:"ingredients"`
	Price        float32        `json:"price,omitempty" json:"price"`
	OrderDishes  []OrderDish    `gorm:"-" json:"dishes"`
	Picture      string         `json:"picture"`
	IsDisabled   bool           `gorm:"default: false"`
}
