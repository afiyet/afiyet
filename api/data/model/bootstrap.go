package model

import "gorm.io/gorm"

func MigrateAll(db *gorm.DB) error {

	query := `DO $$ BEGIN
    			CREATE TYPE status AS ENUM (
					'IN_PROGRESS',
					'PAYMENT_ACCEPTED',
					'PAYMENT_FAILED',
					'COMPLETED');
			EXCEPTION
    			WHEN duplicate_object THEN null;
			END $$;`

	db.Raw(query)
	return db.AutoMigrate(
		&Dish{},
		&Rating{},
		&Restaurant{},
		&User{},
		&Order{},
		&Table{},
		&OrderDish{},
		&Campaign{})
}
