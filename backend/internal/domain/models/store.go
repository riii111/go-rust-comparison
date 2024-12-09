package models

import (
	"time"
)

// Store モデル
type Store struct {
	ID            string    `gorm:"type:uuid;primaryKey" json:"id"`   // 主キー
	Name          string    `gorm:"not null" json:"name"`             // 店舗名
	Address       string    `gorm:"type:text" json:"address"`         // 住所
	PhoneNumber   string    `json:"phone_number"`                     // 電話番号
	BusinessHours string    `json:"business_hours"`                   // 営業時間
	ZipCode       string    `json:"zip_code"`                         // 郵便番号
	Description   string    `gorm:"type:text" json:"description"`     // 店舗説明
	IsActive      bool      `gorm:"not null" json:"is_active"`        // 有効フラグ
	CreatedBy     string    `gorm:"type:uuid" json:"created_by"`      // 作成者（外部キー）
	UpdatedBy     string    `gorm:"type:uuid" json:"updated_by"`      // 更新者（外部キー）
	CreatedAt     time.Time `gorm:"autoCreateTime" json:"created_at"` // 作成日時
	UpdatedAt     time.Time `gorm:"autoUpdateTime" json:"updated_at"` // 更新日時
}
