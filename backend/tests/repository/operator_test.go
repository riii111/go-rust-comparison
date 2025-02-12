package repository_test

import (
	"testing"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupTestDB(t *testing.T) {
	database.InitDB()
	require.NotNil(t, database.DB, "データベース接続の初期化に失敗しました")
}

func setupTestData(t *testing.T) string {
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
	if database.DB == nil {
		return
	}

	tx := database.DB.Begin()
	defer tx.Rollback()

	err := tx.Exec("TRUNCATE TABLE operators CASCADE").Error
	require.NoError(t, err, "オペレーターデータの削除に失敗しました")

	err = tx.Exec("TRUNCATE TABLE stores CASCADE").Error
	require.NoError(t, err, "店舗データの削除に失敗しました")
}

func TestOperatorRepository(t *testing.T) {
	// データベースのセットアップ
	database.InitDB()
	repo := repository.NewOperatorRepository(database.DB)

	// テストデータのセットアップ
	storeID := setupTestData(t)

	t.Run("CreateOperator - 正常系", func(t *testing.T) {
		operator := &models.Operator{
			Email:        "test@example.com",
			Username:     "testuser",
			PasswordHash: "hashedpassword",
			Role:         models.RoleSystemAdmin,
			StoreID:      storeID,
			CreatedBy:    "550e8400-e29b-41d4-a716-446655440001",
			UpdatedBy:    "550e8400-e29b-41d4-a716-446655440001",
		}
		err := repo.Create(operator)
		assert.NoError(t, err)
	})

	t.Run("CreateOperator - メールアドレス重複", func(t *testing.T) {
		duplicateOperator := &models.Operator{
			Email:        "test@example.com",
			Username:     "testuser2",
			PasswordHash: "hashedpassword",
			Role:         models.RoleSystemAdmin,
			StoreID:      storeID,
			CreatedBy:    "550e8400-e29b-41d4-a716-446655440001",
			UpdatedBy:    "550e8400-e29b-41d4-a716-446655440001",
		}
		err := repo.Create(duplicateOperator)
		assert.ErrorIs(t, err, repository.ErrDuplicateEmail)
	})
}
