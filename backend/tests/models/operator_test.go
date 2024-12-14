package models_test

import (
	"testing"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// TestOperatorModel は Operator モデルの機能をテストします。
// 以下の項目について検証を行います：
//   - フィールドの型と制約
//   - 必須フィールドのバリデーション
//   - パスワードバリデーション（以下の要件を確認）：
//   - 最小8文字
//   - 大文字を含む
//   - 小文字を含む
//   - 数字を含む
//   - 特殊文字を含む
func TestOperatorModel(t *testing.T) {
	validate := validator.New()
	models.RegisterCustomValidations(validate)

	validStore := models.Store{
		ID:            "550e8400-e29b-41d4-a716-446655440000",
		Name:          "テスト店舗",
		Address:       "東京都渋谷区",
		PhoneNumber:   "09012345678",
		BusinessHours: "9:00-18:00",
		ZipCode:       "150-0001",
		Description:   "テスト用の店舗です",
		IsActive:      true,
		CreatedBy:     "550e8400-e29b-41d4-a716-446655440001",
		UpdatedBy:     "550e8400-e29b-41d4-a716-446655440001",
	}

	t.Run("フィールド型と制約の検証", func(t *testing.T) {
		operator := &models.Operator{
			ID:           "550e8400-e29b-41d4-a716-446655440000",
			Email:        "test@example.com",
			Username:     "testuser",
			PasswordHash: "Password1!",
			Role:         "operator",
			StoreID:      "550e8400-e29b-41d4-a716-446655440001",
			CreatedBy:    "550e8400-e29b-41d4-a716-446655440002",
			UpdatedBy:    "550e8400-e29b-41d4-a716-446655440002",
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
			Store:        validStore,
		}

		assert.IsType(t, "", operator.ID)
		assert.IsType(t, "", operator.Email)
		assert.IsType(t, "", operator.Username)
		assert.IsType(t, "", operator.PasswordHash)
		assert.IsType(t, "", operator.Role)
		assert.IsType(t, time.Time{}, operator.CreatedAt)
	})

	t.Run("必須フィールドのバリデーション", func(t *testing.T) {
		tests := []struct {
			name     string
			operator *models.Operator
			wantErr  bool
		}{
			{
				name: "有効なデータ",
				operator: &models.Operator{
					Email:        "test@example.com",
					Username:     "testuser",
					PasswordHash: "Password1!",
					Role:         "operator",
					StoreID:      "550e8400-e29b-41d4-a716-446655440000",
					CreatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					Store:        validStore,
				},
				wantErr: false,
			},
			{
				name: "無効なメールアドレス",
				operator: &models.Operator{
					Email:        "invalid-email",
					Username:     "testuser",
					PasswordHash: "Password1!",
					Role:         "operator",
					StoreID:      "550e8400-e29b-41d4-a716-446655440000",
					CreatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					Store:        validStore,
				},
				wantErr: true,
			},
			{
				name: "無効なロール",
				operator: &models.Operator{
					Email:        "test@example.com",
					Username:     "testuser",
					PasswordHash: "Password1!",
					Role:         "invalid-role",
					StoreID:      "550e8400-e29b-41d4-a716-446655440000",
					CreatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					Store:        validStore,
				},
				wantErr: true,
			},
			{
				name: "無効なUUID",
				operator: &models.Operator{
					Email:        "test@example.com",
					Username:     "testuser",
					PasswordHash: "Password1!",
					Role:         "operator",
					StoreID:      "invalid-uuid",
					CreatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					Store:        validStore,
				},
				wantErr: true,
			},
		}

		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				err := validate.Struct(tt.operator)

				if tt.wantErr {
					require.Error(t, err)
					assert.Contains(t, err.Error(), "validation")
				} else {
					assert.NoError(t, err)
				}
			})
		}
	})

	t.Run("パスワードバリデーション", func(t *testing.T) {
		tests := []struct {
			name     string
			password string
			wantErr  bool
		}{
			{
				name:     "有効なパスワード",
				password: "Password1!",
				wantErr:  false,
			},
			{
				name:     "8文字未満",
				password: "Pass1!",
				wantErr:  true,
			},
			{
				name:     "大文字なし",
				password: "password1!",
				wantErr:  true,
			},
			{
				name:     "小文字なし",
				password: "PASSWORD1!",
				wantErr:  true,
			},
			{
				name:     "数字なし",
				password: "Password!",
				wantErr:  true,
			},
			{
				name:     "記号なし",
				password: "Password1",
				wantErr:  true,
			},
		}

		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				operator := &models.Operator{
					Email:        "test@example.com",
					Username:     "testuser",
					PasswordHash: tt.password,
					Role:         "operator",
					StoreID:      "550e8400-e29b-41d4-a716-446655440000",
					CreatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:    "550e8400-e29b-41d4-a716-446655440001",
					Store:        validStore,
				}

				err := validate.Struct(operator)

				if tt.wantErr {
					require.Error(t, err)
					assert.Contains(t, err.Error(), "password")
				} else {
					assert.NoError(t, err)
				}
			})
		}
	})
}
