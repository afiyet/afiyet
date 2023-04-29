package model

import (
	"database/sql/driver"
	"time"

	"gorm.io/gorm"
)

type Status string

const (
	IN_PROGRESS      Status = "IN_PROGRESS"
	PAYMENT_ACCEPTED Status = "PAYMENT_ACCEPTED"
	PAYMENT_FAILED   Status = "PAYMENT_FAILED"
	COMPLETED        Status = "COMPLETED"
)

func (st *Status) Scan(value interface{}) error {
	*st = Status(value.([]byte))
	return nil
}

func (st Status) Value() (driver.Value, error) {
	return string(st), nil
}

type Order struct {
	ID           uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt    time.Time      `json:"createdAt,omitempty"`
	UpdatedAt    time.Time      `json:"updatedAt,omitempty"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Dishes       []Dish         `gorm:"many2many:order_dishes" json:"dishes"`
	TableId      string         `json:"tabelId"`
	Table        Table          `gorm:"foreignKey:TableId" json:"table,omitempty"`
	RestaurantId string         `json:"restaurantId"`
	Restaurant   Restaurant     `gorm:"foreignKey:RestaurantId" json:"restaurant,omitempty"`
	Status       string         `gorm:"type:status;default:'IN_PROGRESS'"`
}
