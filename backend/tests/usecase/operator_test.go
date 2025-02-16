package usecase_test

import (
	"log"
	"testing"

	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func init() {
	// データベース接続の初期化を先に行う
	database.InitDB()

	// カスタムバリデーションの登録
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		err := requests.RegisterOperatorValidations(v)
		if err != nil {
			log.Fatalf("バリデーション登録に失敗しました: %v", err)
		}
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
		CreatedBy:     "00000000-0000-0000-0000-000000000000",
		UpdatedBy:     "00000000-0000-0000-0000-000000000000",
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
	// データベースのセットアップ
	database.InitDB()
	operatorRepo := repository.NewOperatorRepository(database.DB)
	operatorUsecase := usecase.NewOperatorUsecase(operatorRepo)

	// テストデータのセットアップ
	storeID := setupTestData(t)

	// 重複チェック用の初期データを作成
	initialOperator := requests.CreateOperatorRequest{
		Email:    "test@example.com",
		Username: "testuser",
		Password: "Password1!",
		Role:     models.RoleSystemAdmin,
		StoreID:  storeID,
	}
	err := operatorUsecase.CreateOperator(initialOperator)
	require.NoError(t, err, "初期データの作成に失敗しました")

	tests := []struct {
		name    string
		request requests.CreateOperatorRequest
		wantErr error
	}{
		{
			name: "正常系：オペレーター作成成功",
			request: requests.CreateOperatorRequest{
				Email:    "unique@example.com",
				Username: "testuser",
				Password: "Password1!",
				Role:     models.RoleSystemAdmin,
				StoreID:  storeID,
			},
			wantErr: nil,
		},
		{
			name: "異常系：メールアドレス重複",
			request: requests.CreateOperatorRequest{
				Email:    "test@example.com", // 初期データと同じメールアドレス
				Username: "testuser2",
				Password: "Password1!",
				Role:     models.RoleSystemAdmin,
				StoreID:  storeID,
			},
			wantErr: repository.ErrDuplicateEmail,
		},
		{
			name: "異常系：存在しない店舗ID",
			request: requests.CreateOperatorRequest{
				Email:    "test2@example.com",
				Username: "testuser3",
				Password: "Password1!",
				Role:     models.RoleSystemAdmin,
				StoreID:  "550e8400-e29b-41d4-a716-446655440999",
			},
			wantErr: repository.ErrForeignKeyViolated,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := operatorUsecase.CreateOperator(tt.request)
			if tt.wantErr != nil {
				assert.ErrorIs(t, err, tt.wantErr)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}
