package models

import (
	"time"
)

type Store struct {
	ID            string    `gorm:"type:uuid;primaryKey" json:"id" validate:"required,uuid"`
	Name          string    `gorm:"not null" json:"name" validate:"required"`
	Address       string    `gorm:"type:text" json:"address"`
	PhoneNumber   string    `gorm:"type:char(11);not null" json:"phone_number" validate:"required,len=11,numeric"`
	BusinessHours string    `json:"business_hours"`
	ZipCode       string    `json:"zip_code"`
	Description   string    `gorm:"type:text" json:"description"`
	IsActive      bool      `gorm:"not null" json:"is_active"`
	CreatedBy     string    `gorm:"type:uuid" json:"created_by" validate:"required,uuid"`
	UpdatedBy     string    `gorm:"type:uuid" json:"updated_by" validate:"required,uuid"`
	CreatedAt     time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
