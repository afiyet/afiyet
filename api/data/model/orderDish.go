package model

import (
	"time"

	"gorm.io/gorm"
)

type OrderDish struct {
	ID        uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt time.Time      `json:"createdAt,omitempty"`
	UpdatedAt time.Time      `json:"updatedAt,omitempty"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	OrderId   string         `json:"orderId"`
	Order     Order          `gorm:"foreignKey:OrderId"`
	DishId    string         `json:"dishId"`
	Dish      Dish           `gorm:"foreignKey:DishId"`
}
