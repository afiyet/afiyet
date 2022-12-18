package model

import "gorm.io/gorm"

type Rating struct {
	gorm.Model
	UserId       string
	User         User `gorm:"foreignKey:UserId"`
	RestaurantId string
	Restaurant   Restaurant `gorm:"foreignKey:RestaurantId"`
	Comment      string
	Point        uint16
}
