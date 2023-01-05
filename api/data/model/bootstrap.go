package model

import "gorm.io/gorm"

func MigrateAll(db *gorm.DB) error {
	return db.AutoMigrate(
		&Dish{},
		&Rating{},
		&Restaurant{},
		&User{},
		&Order{},
		&Table{},
		&OrderDish{})
}
