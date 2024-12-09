package models

import (
	"time"

	"gorm.io/gorm"
)

type Operator struct {
	ID           string         `gorm:"type:uuid;primaryKey" json:"id"`   // 主キー
	Email        string         `gorm:"unique;not null" json:"email"`     // 一意制約付き
	Username     string         `gorm:"not null" json:"username"`         // ユーザー名
	PasswordHash string         `gorm:"not null" json:"password_hash"`    // ハッシュ化されたパスワード
	Role         string         `gorm:"not null" json:"role"`             // ロール（例：管理者、ユーザーなど）
	StoreID      string         `gorm:"type:uuid" json:"store_id"`        // 外部キー（Storesテーブル）
	AvatarURL    string         `json:"avatar_url"`                       // アバター画像URL
	CreatedBy    string         `gorm:"type:uuid" json:"created_by"`      // 作成者（外部キー）
	UpdatedBy    string         `gorm:"type:uuid" json:"updated_by"`      // 更新者（外部キー）
	DeletedBy    string         `gorm:"type:uuid" json:"deleted_by"`      // 削除者（外部キー）
	CreatedAt    time.Time      `gorm:"autoCreateTime" json:"created_at"` // 作成日時
	UpdatedAt    time.Time      `gorm:"autoUpdateTime" json:"updated_at"` // 更新日時
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted_at"`          // ソフトデリート用
	Store        Store          `gorm:"foreignKey:StoreID" json:"store"`  // 関連付け（Storesテーブル）
}
