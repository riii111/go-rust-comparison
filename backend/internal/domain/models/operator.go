package models

import (
	"time"

	"gorm.io/gorm"
)

type Operator struct {
	ID           string         `gorm:"type:uuid;primaryKey" json:"id"`
	Email        string         `gorm:"unique;not null" json:"email"`
	Username     string         `gorm:"not null" json:"username"`
	PasswordHash string         `gorm:"not null" json:"password_hash"`
	Role         string         `gorm:"not null" json:"role"`
	StoreID      string         `gorm:"type:uuid" json:"store_id"`
	AvatarURL    string         `json:"avatar_url"`
	CreatedBy    string         `gorm:"type:uuid" json:"created_by"`
	UpdatedBy    string         `gorm:"type:uuid" json:"updated_by"`
	DeletedBy    string         `gorm:"type:uuid" json:"deleted_by"`
	CreatedAt    time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	Store        Store          `gorm:"foreignKey:StoreID" json:"store"`
}
