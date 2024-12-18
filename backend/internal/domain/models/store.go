package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Store struct {
	ID            string    `gorm:"type:uuid;primary_key" json:"id"`
	Name          string    `gorm:"not null" json:"name" validate:"required"`
	Address       string    `gorm:"type:text;not null" json:"address" validate:"required"`
	PhoneNumber   string    `gorm:"type:varchar(11);not null" json:"phone_number" validate:"required,len=11,numeric"`
	BusinessHours string    `gorm:"not null" json:"business_hours" validate:"required"`
	ZipCode       string    `gorm:"not null" json:"zip_code" validate:"required"`
	Description   string    `gorm:"type:text;not null" json:"description" validate:"required"`
	IsActive      bool      `gorm:"not null" json:"is_active"`
	CreatedBy     string    `gorm:"type:uuid" json:"created_by" validate:"required,uuid"`
	UpdatedBy     string    `gorm:"type:uuid" json:"updated_by" validate:"required,uuid"`
	CreatedAt     time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime" json:"updated_at"`
	Stocks        []Stock   `gorm:"constraint:OnDelete:SET NULL" json:"stocks"`
}

// レコード作成前にUUID v7を自動生成する
func (o *Store) BeforeCreate(tx *gorm.DB) error {
	if o.ID != "" {
		return nil
	}

	id, err := uuid.NewV7()
	if err != nil {
		return err
	}

	o.ID = id.String()
	return nil
}
