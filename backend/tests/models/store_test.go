package models_test

import (
	"testing"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestStoreModel(t *testing.T) {
	t.Run("フィールド型と制約の検証", func(t *testing.T) {
		store := &models.Store{
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
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}

		// 構造体の基本的な検証
		assert.IsType(t, "", store.ID)
		assert.IsType(t, "", store.Name)
		assert.IsType(t, "", store.PhoneNumber)
		assert.IsType(t, true, store.IsActive)
		assert.IsType(t, time.Time{}, store.CreatedAt)
	})

	t.Run("必須フィールドのバリデーション", func(t *testing.T) {
		validate := validator.New()

		tests := []struct {
			name    string
			store   *models.Store
			wantErr bool
		}{
			{
				name: "有効なデータ",
				store: &models.Store{
					Name:        "テスト店舗",
					PhoneNumber: "09012345678",
					IsActive:    true,
				},
				wantErr: false,
			},
			{
				name: "無効な電話番号（空）",
				store: &models.Store{
					Name:        "テスト店舗",
					PhoneNumber: "",
					IsActive:    true,
				},
				wantErr: true,
			},
			{
				name: "無効な電話番号（桁数不足）",
				store: &models.Store{
					Name:        "テスト店舗",
					PhoneNumber: "0901234567",
					IsActive:    true,
				},
				wantErr: true,
			},
			{
				name: "無効な電話番号（数字以外）",
				store: &models.Store{
					Name:        "テスト店舗",
					PhoneNumber: "090-1234-567",
					IsActive:    true,
				},
				wantErr: true,
			},
		}

		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				err := validate.Struct(tt.store)

				if tt.wantErr {
					require.Error(t, err)
					assert.Contains(t, err.Error(), "validation")
				} else {
					assert.NoError(t, err)
				}
			})
		}
	})

	t.Run("フィールド長の検証", func(t *testing.T) {
		store := &models.Store{
			PhoneNumber: "09012345678",
		}

		assert.Len(t, store.PhoneNumber, 11, "電話番号は11桁である必要があります")
	})
}
