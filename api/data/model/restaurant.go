package model

import (
	"time"

	"gorm.io/gorm"
)

type Restaurant struct {
	ID        uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt time.Time      `json:"createdAt,omitempty"`
	UpdatedAt time.Time      `json:"updatedAt,omitempty"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Name      string         `json:"name"`
	Address   string         `json:"address"`
	Category  string         `json:"category"`
	Dishes    []Dish         `gorm:"-" json:"dishes,omitempty"`
	Ratings   []Rating       `gorm:"-" json:"ratings,omitempty"`
	Tables    []Table        `gorm:"-" json:"tables,omitempty"`
	Location  string         `json:"location"`
	Password  string         `json:"password"`
	Mail      string         `json:"mail"`
}
