package model

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Dish struct {
	gorm.Model
	RestaurantId string
	Restaurant   Restaurant `gorm:"foreignKey:RestaurantId"`
	Name         string
	Category     string
	Ingredients  pq.StringArray `gorm:"type:text[]"`
	Price        float32
}
