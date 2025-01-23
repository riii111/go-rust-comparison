package usecase_test

import (
	"testing"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func init() {
	// データベース接続の初期化を先に行う
	database.InitDB()

	// その後、ロガーの設定を変更
	if database.DB != nil {
		database.DB, _ = gorm.Open(database.DB.Dialector, &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent),
		})
	}
}

func setupTestData(t *testing.T) string {
	// 既存のデータを確実にクリーンアップ
	cleanupTestData(t)

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

	err := database.DB.Create(store).Error
	require.NoError(t, err, "店舗データの作成に失敗しました")

	return store.ID
}

func cleanupTestData(t *testing.T) {
	// 先にオペレーターを削除
	err := database.DB.Exec("DELETE FROM operators").Error
	require.NoError(t, err)

	// その後に店舗を削除
	err = database.DB.Exec("DELETE FROM stores").Error
	require.NoError(t, err)
}

func TestCreateOperator(t *testing.T) {
	// データベース初期化
	database.InitDB()

	// テストデータのセットアップ
	storeID := setupTestData(t)

	// テスト終了時のクリーンアップを確実に実行
	defer cleanupTestData(t)

	operatorUsecase := usecase.NewOperatorUsecase()

	tests := []struct {
		name    string
		request requests.CreateOperatorRequest
		wantErr error
	}{
		{
			name: "正常系：オペレーター作成成功",
			request: requests.CreateOperatorRequest{
				Email:     "test@example.com",
				Username:  "testuser",
				Password:  "Password1!",
				Role:      "system_admin",
				StoreID:   storeID,
				CreatedBy: "550e8400-e29b-41d4-a716-446655440001",
			},
			wantErr: nil,
		},
		{
			name: "異常系：メールアドレス重複",
			request: requests.CreateOperatorRequest{
				Email:     "test@example.com",
				Username:  "testuser2",
				Password:  "Password1!",
				Role:      "system_admin",
				StoreID:   storeID,
				CreatedBy: "550e8400-e29b-41d4-a716-446655440001",
			},
			wantErr: repository.ErrDuplicateEmail,
		},
		{
			name: "異常系：存在しない店舗ID",
			request: requests.CreateOperatorRequest{
				Email:     "test2@example.com",
				Username:  "testuser2",
				Password:  "Password1!",
				Role:      "system_admin",
				StoreID:   "550e8400-e29b-41d4-a716-446655440999",
				CreatedBy: "550e8400-e29b-41d4-a716-446655440001",
			},
			wantErr: usecase.ErrStoreNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// サブテスト毎にデータベースをクリーンな状態に
			if tt.name != "異常系：メールアドレス重複" {
				cleanupTestData(t)
				storeID = setupTestData(t)
				if tt.request.StoreID == "550e8400-e29b-41d4-a716-446655440000" {
					tt.request.StoreID = storeID
				}
			}

			err := operatorUsecase.CreateOperator(tt.request)

			if tt.wantErr != nil {
				assert.ErrorIs(t, err, tt.wantErr)
			} else {
				assert.NoError(t, err)

				// データベースに正しく保存されているか確認
				var operator models.Operator
				err = database.DB.Where("email = ?", tt.request.Email).First(&operator).Error
				require.NoError(t, err)

				assert.Equal(t, tt.request.Email, operator.Email)
				assert.Equal(t, tt.request.Username, operator.Username)
				assert.Equal(t, tt.request.Role, operator.Role)
				assert.Equal(t, tt.request.StoreID, operator.StoreID)
				assert.Equal(t, tt.request.CreatedBy, operator.CreatedBy)
			}
		})
	}
}
