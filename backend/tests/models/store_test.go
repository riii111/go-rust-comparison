package models_test

import (
	"testing"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// TestStoreModel は Store モデルの機能をテストします。
// 以下の項目について検証を行います：
//   - フィールドの型と制約
//   - 必須フィールドのバリデーション
//   - フィールド長の検証
//   - オプショナルフィールドの検証
func TestStoreModel(t *testing.T) {
	validate := validator.New()

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

		// 型の検証
		assert.IsType(t, "", store.ID)
		assert.IsType(t, "", store.Name)
		assert.IsType(t, "", store.Address)
		assert.IsType(t, "", store.PhoneNumber)
		assert.IsType(t, "", store.BusinessHours)
		assert.IsType(t, "", store.ZipCode)
		assert.IsType(t, "", store.Description)
		assert.IsType(t, true, store.IsActive)
		assert.IsType(t, "", store.CreatedBy)
		assert.IsType(t, "", store.UpdatedBy)
		assert.IsType(t, time.Time{}, store.CreatedAt)
		assert.IsType(t, time.Time{}, store.UpdatedAt)

		// UUID形式の検証
		assert.Regexp(t, "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", store.ID)
		assert.Regexp(t, "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", store.CreatedBy)
		assert.Regexp(t, "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", store.UpdatedBy)
	})

	t.Run("必須フィールドのバリデーション", func(t *testing.T) {
		tests := []struct {
			name    string
			store   *models.Store
			wantErr bool
		}{
			{
				name: "有効なデータ",
				store: &models.Store{
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
				},
				wantErr: false,
			},
			{
				name: "無効な電話番号（空）",
				store: &models.Store{
					ID:          "550e8400-e29b-41d4-a716-446655440000",
					Name:        "テスト店舗",
					PhoneNumber: "",
					IsActive:    true,
					CreatedBy:   "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:   "550e8400-e29b-41d4-a716-446655440001",
				},
				wantErr: true,
			},
			{
				name: "無効な電話番号（桁数不足）",
				store: &models.Store{
					ID:          "550e8400-e29b-41d4-a716-446655440000",
					Name:        "テスト店舗",
					PhoneNumber: "090123456",
					IsActive:    true,
					CreatedBy:   "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:   "550e8400-e29b-41d4-a716-446655440001",
				},
				wantErr: true,
			},
			{
				name: "無効な電話番号（数字以外）",
				store: &models.Store{
					ID:          "550e8400-e29b-41d4-a716-446655440000",
					Name:        "テスト店舗",
					PhoneNumber: "090-1234-5678",
					IsActive:    true,
					CreatedBy:   "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:   "550e8400-e29b-41d4-a716-446655440001",
				},
				wantErr: true,
			},
			{
				name: "無効なUUID（CreatedBy）",
				store: &models.Store{
					ID:          "550e8400-e29b-41d4-a716-446655440000",
					Name:        "テスト店舗",
					PhoneNumber: "09012345678",
					IsActive:    true,
					CreatedBy:   "invalid-uuid",
					UpdatedBy:   "550e8400-e29b-41d4-a716-446655440001",
				},
				wantErr: true,
			},
			{
				name: "必須フィールドが空（Name）",
				store: &models.Store{
					ID:            "550e8400-e29b-41d4-a716-446655440000",
					Name:          "", // 空文字列
					Address:       "東京都渋谷区",
					PhoneNumber:   "09012345678",
					BusinessHours: "9:00-18:00",
					ZipCode:       "150-0001",
					Description:   "テスト用の店舗です",
					IsActive:      true,
					CreatedBy:     "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:     "550e8400-e29b-41d4-a716-446655440001",
				},
				wantErr: true,
			},
			{
				name: "必須フィールドが空（Address）",
				store: &models.Store{
					ID:            "550e8400-e29b-41d4-a716-446655440000",
					Name:          "テスト店舗",
					Address:       "", // 空文字列
					PhoneNumber:   "09012345678",
					BusinessHours: "9:00-18:00",
					ZipCode:       "150-0001",
					Description:   "テスト用の店舗です",
					IsActive:      true,
					CreatedBy:     "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:     "550e8400-e29b-41d4-a716-446655440001",
				},
				wantErr: true,
			},
			{
				name: "必須フィールドが空（BusinessHours）",
				store: &models.Store{
					ID:            "550e8400-e29b-41d4-a716-446655440000",
					Name:          "テスト店舗",
					Address:       "東京都渋谷区",
					PhoneNumber:   "09012345678",
					BusinessHours: "", // 空文字列
					ZipCode:       "150-0001",
					Description:   "テスト用の店舗です",
					IsActive:      true,
					CreatedBy:     "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:     "550e8400-e29b-41d4-a716-446655440001",
				},
				wantErr: true,
			},
			{
				name: "必須フィールドが空（ZipCode）",
				store: &models.Store{
					ID:            "550e8400-e29b-41d4-a716-446655440000",
					Name:          "テスト店舗",
					Address:       "東京都渋谷区",
					PhoneNumber:   "09012345678",
					BusinessHours: "9:00-18:00",
					ZipCode:       "", // 空文字列
					Description:   "テスト用の店舗です",
					IsActive:      true,
					CreatedBy:     "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:     "550e8400-e29b-41d4-a716-446655440001",
				},
				wantErr: true,
			},
			{
				name: "必須フィールドが空（Description）",
				store: &models.Store{
					ID:            "550e8400-e29b-41d4-a716-446655440000",
					Name:          "テスト店舗",
					Address:       "東京都渋谷区",
					PhoneNumber:   "09012345678",
					BusinessHours: "9:00-18:00",
					ZipCode:       "150-0001",
					Description:   "", // 空文字列
					IsActive:      true,
					CreatedBy:     "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:     "550e8400-e29b-41d4-a716-446655440001",
				},
				wantErr: true,
			},
		}

		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				err := validate.Struct(tt.store)

				if tt.wantErr {
					require.Error(t, err)
					if tt.name == "無効なUUID（CreatedBy）" {
						assert.Contains(t, err.Error(), "CreatedBy")
						assert.Contains(t, err.Error(), "uuid")
					}
				} else {
					assert.NoError(t, err)
				}
			})
		}
	})

	t.Run("フィールド長の検証", func(t *testing.T) {
		tests := []struct {
			name    string
			store   *models.Store
			wantErr bool
		}{
			{
				name: "話番号が11桁",
				store: &models.Store{
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
				},
				wantErr: false,
			},
			{
				name: "電話番号が12桁（エラー）",
				store: &models.Store{
					ID:          "550e8400-e29b-41d4-a716-446655440000",
					Name:        "テスト店舗",
					PhoneNumber: "090123456789",
					IsActive:    true,
					CreatedBy:   "550e8400-e29b-41d4-a716-446655440001",
					UpdatedBy:   "550e8400-e29b-41d4-a716-446655440001",
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

	t.Run("オプショナルフィールドの検証", func(t *testing.T) {
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
		}

		// オプショナルフィールドが空でもバリデーションが通ることを確認
		err := validate.Struct(store)
		assert.NoError(t, err)

		// オプショナルフィールドに値を設定
		store.Address = "東京都渋谷区"
		store.BusinessHours = "9:00-18:00"
		store.ZipCode = "150-0001"
		store.Description = "テスト用の店舗です"

		// 値を設定しても問題ないことを確認
		err = validate.Struct(store)
		assert.NoError(t, err)
	})
}
