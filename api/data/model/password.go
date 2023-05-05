package model

import (
	"time"

	"gorm.io/gorm"
)

type PasswordChange struct {
	ID        uint           `gorm:"primarykey" json:"ID,omitempty"`
	CreatedAt time.Time      `json:"createdAt,omitempty"`
	UpdatedAt time.Time      `json:"updatedAt,omitempty"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Token     string         `json:"token,omitempty"`
	Email     string         `json:"email,omitempty"`
	UserType  string         `json:"userType,omitempty"`
}

type PasswordTemp struct {
	TempPassword string `json:"tempPassword"`
	Token        string `json:"token"`
}
