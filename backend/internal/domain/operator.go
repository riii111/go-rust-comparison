package models

import (
	"time"

	"gorm.io/gorm"
)

type Operator struct {
	ID           string         `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Email        string         `gorm:"uniqueIndex;not null" json:"email"`
	Username     string         `gorm:"not null" json:"username"`
	PasswordHash string         `gorm:"not null" json:"-"`
	Role         string         `gorm:"not null" json:"role"` // 例: "admin", "manager"
	StoreID      string         `gorm:"type:uuid" json:"store_id"`
	AvatarURL    string         `json:"avatar_url"`
	CreatedBy    string         `gorm:"type:uuid" json:"created_by"`
	UpdatedBy    string         `gorm:"type:uuid" json:"updated_by"`
	DeletedBy    string         `gorm:"type:uuid" json:"deleted_by"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted_at"`
}
