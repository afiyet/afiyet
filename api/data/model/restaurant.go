package model

import (
	"time"

	"gorm.io/gorm"
)

type Restaurant struct {
	ID              uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt       time.Time      `json:"createdAt,omitempty"`
	UpdatedAt       time.Time      `json:"updatedAt,omitempty"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Name            string         `json:"name"`
	Address         string         `json:"address"`
	Category        string         `json:"category"`
	Dishes          []Dish         `gorm:"-" json:"dishes,omitempty"`
	Ratings         []Rating       `gorm:"-" json:"ratings,omitempty"`
	Tables          []Table        `gorm:"foreignKey:RestaurantId" json:"tables,omitempty"`
	Latitude        float64
	Longitude       float64
	Password        string `json:"password"`
	Mail            string `json:"mail"`
	Picture         string `json:"picture"`
	CampaignPicture string `json:"campaignPicture" gorm:"default: ''"`
}
