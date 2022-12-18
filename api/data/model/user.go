package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name    string
	Surname string
	Mail    string
	Rating  []Rating `gorm:"-"`
}
