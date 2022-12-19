package model

import (
	"gorm.io/gorm"
	"time"
)

type Rating struct {
	ID           uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt    time.Time      `json:"createdAt,omitempty"`
	UpdatedAt    time.Time      `json:"updatedAt,omitempty"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	UserId       string         `json:"userId"`
	User         User           `gorm:"foreignKey:UserId" json:"user,omitempty"`
	RestaurantId string         `json:"restaurantId,omitempty"`
	Restaurant   Restaurant     `gorm:"foreignKey:RestaurantId" json:"restaurant,omitempty"`
	Comment      string         `json:"comment,omitempty"`
	Point        uint16         `json:"point"`
}
