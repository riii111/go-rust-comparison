package models

import (
	"time"
	"unicode"

	"github.com/go-playground/validator/v10"
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
	StoreID      string         `gorm:"type:uuid" json:"store_id" validate:"required,uuid"`
	AvatarURL    string         `json:"avatar_url" validate:"omitempty,url"`
	CreatedBy    string         `gorm:"type:uuid" json:"created_by" validate:"required,uuid"`
	UpdatedBy    string         `gorm:"type:uuid" json:"updated_by" validate:"required,uuid"`
	DeletedBy    string         `gorm:"type:uuid" json:"deleted_by" validate:"omitempty,uuid"`
	CreatedAt    time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	Store        Store          `gorm:"foreignKey:StoreID" json:"store"`
}

func (o *Operator) BeforeCreate(tx *gorm.DB) error {
	if o.ID == "" {
		o.ID = uuid.New().String()
	}
	return nil
}

// カスタムバリデーション関数を登録
func RegisterCustomValidations(v *validator.Validate) {
	v.RegisterValidation("password", validatePassword)
}

// パスワードバリデーション関数
func validatePassword(fl validator.FieldLevel) bool {
	password := fl.Field().String()

	if len(password) < 8 {
		return false
	}

	var (
		hasUpper   bool
		hasLower   bool
		hasNumber  bool
		hasSpecial bool
	)

	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsNumber(char):
			hasNumber = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSpecial = true
		}
	}

	return hasUpper && hasLower && hasNumber && hasSpecial
}
