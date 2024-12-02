package models

import (
	"time"
)

type Store struct {
	ID            string    `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name          string    `gorm:"not null" json:"name"`
	Address       string    `gorm:"type:text" json:"address"`
	PhoneNumber   string    `json:"phone_number"`
	BusinessHours string    `json:"business_hours"`
	ZipCode       string    `json:"zip_code"`
	Description   string    `gorm:"type:text" json:"description"`
	IsActive      bool      `gorm:"default:true" json:"is_active"`
	CreatedBy     string    `gorm:"type:uuid" json:"created_by"`
	UpdatedBy     string    `gorm:"type:uuid" json:"updated_by"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
