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
)

func init() {
	// データベース接続の初期化を先に行う
	database.InitDB()
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
	// データベース初期化
	database.InitDB()

	// テストデータのセットアップ
	storeID := setupTestData(t)

	// テスト終了時のクリーンアップを確実に実行
	defer cleanupTestData(t)

	// オペレーターリポジトリを作成し、usecaseに注入
	operatorRepo := repository.NewOperatorRepository(database.DB)
	operatorUsecase := usecase.NewOperatorUsecase(operatorRepo)

	tests := []struct {
		name    string
		request requests.CreateOperatorRequest
		wantErr error
	}{
		{
			name: "正常系：オペレーター作成成功",
			request: requests.CreateOperatorRequest{
				Email:    "test@example.com",
				Username: "testuser",
				Password: "Password1!",
				Role:     models.RoleSystemAdmin,
				StoreID:  "550e8400-e29b-41d4-a716-446655440000",
			},
			wantErr: nil,
		},
		{
			name: "異常系：メールアドレス重複",
			request: requests.CreateOperatorRequest{
				Email:    "test@example.com",
				Username: "testuser2",
				Password: "Password1!",
				Role:     models.RoleSystemAdmin,
				StoreID:  "550e8400-e29b-41d4-a716-446655440000",
			},
			wantErr: repository.ErrDuplicateEmail,
		},
		{
			name: "異常系：存在しない店舗ID",
			request: requests.CreateOperatorRequest{
				Email:    "test@example.com",
				Username: "testuser",
				Password: "Password1!",
				Role:     models.RoleSystemAdmin,
				StoreID:  "550e8400-e29b-41d4-a716-446655440999",
			},
			wantErr: repository.ErrForeignKeyViolated,
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

				// 比較用の構造体を作成
				expected := models.Operator{
					ID:           operator.ID,      // 自動生成される値はそのまま使用
					Email:        tt.request.Email, // リクエストの値を使用
					Username:     tt.request.Username,
					Role:         tt.request.Role,
					StoreID:      tt.request.StoreID,
					PasswordHash: operator.PasswordHash, // DBから取得した値をそのまま使用
					AvatarURL:    operator.AvatarURL,
					CreatedBy:    operator.CreatedBy,
					UpdatedBy:    operator.UpdatedBy,
					DeletedBy:    operator.DeletedBy,
					CreatedAt:    operator.CreatedAt,
					UpdatedAt:    operator.UpdatedAt,
					DeletedAt:    operator.DeletedAt,
				}
				// 構造体全体をチェック
				assert.Equal(t, expected, operator)

				// フィールドごとにチェック
				// assert.Equal(t, tt.request.Email, operator.Email)
				// assert.Equal(t, tt.request.Username, operator.Username)
				// assert.Equal(t, tt.request.Role, operator.Role)
				// assert.Equal(t, tt.request.StoreID, operator.StoreID)
			}
		})
	}
}
