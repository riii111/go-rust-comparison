package models

import (
    "time"

    "github.com/google/uuid"
	"github.com/shopspring/decimal"
    "gorm.io/gorm"
)

type Product struct {
    ID           string    			`gorm:"type:uuid;primaryKey" json:"id"`
    Name         string    			`gorm:"not null" json:"name" validate:"required`
    Description  string    			`gorm:"type:text;not null" json:"description" validate:"required`
    MaterialInfo string    			`gorm:"type:text;not null" json:"material_info" validate:"required`
    BasePrice    decimal.Decimal	`gorm:"type:decimal(10,2);not null" json:"base_price" validate:"required"`
    Category     string    			`gorm:"not null" json:"category" validate:"required"`
    ImageURLs    []string  			`gorm:"type:text[]" json:"image_urls"`
	CreatedBy     string    		`gorm:"type:uuid" json:"created_by" validate:"required,uuid"`
	UpdatedBy     string    		`gorm:"type:uuid" json:"updated_by" validate:"required,uuid"`
    CreatedAt    time.Time 			`gorm:"autoCreateTime" json:"created_at"`
    UpdatedAt    time.Time 			`gorm:"autoUpdateTime" json:"updated_at"`
    Stocks       []Stock   			`gorm:"constraint:OnDelete:SET NULL" json:"stocks"`
}

// レコード作成前にUUID v7を自動生成する
func (p *Product) BeforeCreate(tx *gorm.DB) error {
    if p.ID != "" {
        return nil
    }

    id, err := uuid.NewUUID()
    if err != nil {
        return err
    }

    p.ID = id.String()
    return nil
}