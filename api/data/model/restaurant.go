package model

import "gorm.io/gorm"

type Restaurant struct {
	gorm.Model
	Name     string
	Address  string
	Category string
	Dishes   []Dish   `gorm:"-"`
	Ratings  []Rating `gorm:"-"`
}
