package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Operatorモデルの権限定数
const (
	RoleSystemAdmin = "system_admin" // システム管理者権限
	RoleStoreAdmin  = "store_admin"  // 店舗管理者権限
)

type Operator struct {
	ID           string         `gorm:"type:uuid;primary_key" json:"id"`
	Email        string         `gorm:"unique;not null" json:"email" validate:"required,email"`
	Username     string         `gorm:"not null" json:"username" validate:"required"`
	PasswordHash string         `gorm:"not null" json:"password_hash" validate:"required,password"`
	Role         string         `gorm:"not null" json:"role" validate:"required,oneof=system_admin store_admin"`
	StoreID      string         `gorm:"type:uuid;not null" json:"store_id" validate:"required,uuid"`
	AvatarURL    string         `json:"avatar_url" validate:"omitempty,url"`
	CreatedBy    string         `gorm:"type:uuid;not null" json:"created_by" validate:"required,uuid"`
	UpdatedBy    string         `gorm:"type:uuid" json:"updated_by" validate:"required,uuid"`
	DeletedBy    *string        `gorm:"type:uuid" json:"deleted_by,omitempty" validate:"omitempty,uuid"`
	CreatedAt    time.Time      `gorm:"autoCreateTime;not null" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	Store        Store          `gorm:"foreignKey:StoreID" json:"store"`
}

// レコード作成前にUUID v7を自動生成する
func (o *Operator) BeforeCreate(tx *gorm.DB) error {
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
