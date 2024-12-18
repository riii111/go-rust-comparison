package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"gorm.io/gorm"
)

type Stock struct {
	ID          string          `gorm:"type:uuid" json:"id"`
	ProductID   string          `gorm:"type:uuid" json:"product_id" validate:"required,uuid"`
	StoreID     string          `gorm:"type:uuid" json:"store_id" validate:"required,uuid"`
	Size        string          `gorm:"not null" json:"size" validate:"required"`
	Color       string          `gorm:"not null" json:"color" validate:"required"`
	Quantity    uint            `gorm:"not null" json:"quantity" validate:"required"`
	Price       decimal.Decimal `gorm:"type:decimal;not null" json:"price" validate:"required"`
	IsAvailable bool            `gorm:"not null" json:"is_available" validate:"required"`
	UpdatedBy   string          `gorm:"type:uuid" json:"updated_by" validate:"required,uuid"`
	DeletedBy   string          `gorm:"type:uuid" json:"deleted_by" validate:"omitempty,uuid"`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
}

// レコード作成前にUUID v7を自動生成する
func (s *Stock) BeforeCreate(tx *gorm.DB) error {
	if s.ID != "" {
		return nil
	}

	id, err := uuid.NewV7()
	if err != nil {
		return err
	}

	s.ID = id.String()
	return nil
}
