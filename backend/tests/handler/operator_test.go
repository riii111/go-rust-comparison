package handler_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupTestRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()

	operatorRepo := repository.NewOperatorRepository(database.DB)
	operatorUsecase := usecase.NewOperatorUsecase(operatorRepo)
	operatorHandler := handlers.NewOperatorHandler(operatorUsecase)

	api := r.Group("/api")
	operators := api.Group("/operators")
	operators.POST("", operatorHandler.CreateOperator)

	return r
}

// テストデータセットアップ用のヘルパー関数
func setupTestData(t *testing.T) {
	// テスト用の店舗データを作成
	store := &models.Store{
		ID:            "550e8400-e29b-41d4-a716-446655440000",
		Name:          "テスト店舗",
		Address:       "東京都渋谷区",
		PhoneNumber:   "09012345678",
		BusinessHours: "9:00-18:00",
		IsActive:      true,
		CreatedBy:     "550e8400-e29b-41d4-a716-446655440001",
		UpdatedBy:     "550e8400-e29b-41d4-a716-446655440001",
	}

	err := database.DB.Create(store).Error
	require.NoError(t, err, "店舗データの作成に失敗しました")
}

func cleanupTestData(t *testing.T) {
	// テストデータの削除
	err := database.DB.Exec("DELETE FROM operators").Error
	require.NoError(t, err, "オペレーターデータの削除に失敗しました")

	err = database.DB.Exec("DELETE FROM stores").Error
	require.NoError(t, err, "店舗データの削除に失敗しました")
}

func TestCreateOperator(t *testing.T) {
	// データベース初期化
	database.InitDB()

	// テストデータのセットアップ
	setupTestData(t)

	// テスト終了時のクリーンアップ
	t.Cleanup(func() {
		cleanupTestData(t)
	})

	router := setupTestRouter()

	tests := []struct {
		name           string
		request        requests.CreateOperatorRequest
		expectedStatus int
		expectedBody   interface{}
	}{
		{
			name: "正常系：オペレーター作成成功",
			request: requests.CreateOperatorRequest{
				Email:    "test@example.com",
				Username: "testuser",
				Password: "Password1!",
				Role:     "system_admin",
				StoreID:  "550e8400-e29b-41d4-a716-446655440000",
			},
			expectedStatus: http.StatusCreated,
			expectedBody: responses.StandardResponse{
				Message: "オペレーターの登録に成功しました",
			},
		},
		{
			name: "異常系：無効なメールアドレス",
			request: requests.CreateOperatorRequest{
				Email:    "invalid-email",
				Username: "testuser",
				Password: "Password1!",
				Role:     "system_admin",
				StoreID:  "550e8400-e29b-41d4-a716-446655440000",
			},
			expectedStatus: http.StatusBadRequest,
			expectedBody: responses.ErrorResponse{
				Error: "入力内容に誤りがあります。確認して再度お試しください",
			},
		},
		{
			name: "異常系：パスワード要件不足",
			request: requests.CreateOperatorRequest{
				Email:    "test@example.com",
				Username: "testuser",
				Password: "weak",
				Role:     "system_admin",
				StoreID:  "550e8400-e29b-41d4-a716-446655440000",
			},
			expectedStatus: http.StatusBadRequest,
			expectedBody: responses.ErrorResponse{
				Error: "入力内容に誤りがあります。確認して再度お試しください",
			},
		},
		{
			name: "異常系：無効なロール",
			request: requests.CreateOperatorRequest{
				Email:    "test@example.com",
				Username: "testuser",
				Password: "Password1!",
				Role:     "invalid_role",
				StoreID:  "550e8400-e29b-41d4-a716-446655440000",
			},
			expectedStatus: http.StatusBadRequest,
			expectedBody: responses.ErrorResponse{
				Error: "入力内容に誤りがあります。確認して再度お試しください",
			},
		},
		{
			name: "異常系：無効なUUID",
			request: requests.CreateOperatorRequest{
				Email:    "test@example.com",
				Username: "testuser",
				Password: "Password1!",
				Role:     "system_admin",
				StoreID:  "invalid-uuid",
			},
			expectedStatus: http.StatusBadRequest,
			expectedBody: responses.ErrorResponse{
				Error: "入力内容に誤りがあります。確認して再度お試しください",
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// リクエストボディの作成
			jsonData, err := json.Marshal(tt.request)
			require.NoError(t, err)

			// HTTPリクエストの作成
			req := httptest.NewRequest(http.MethodPost, "/api/operators", bytes.NewBuffer(jsonData))
			req.Header.Set("Content-Type", "application/json")

			// レスポンスレコーダーの作成
			w := httptest.NewRecorder()

			// リクエストの実行
			router.ServeHTTP(w, req)

			// ステータスコードの検証
			assert.Equal(t, tt.expectedStatus, w.Code)

			// レスポンスボディの検証
			var response map[string]interface{}
			err = json.Unmarshal(w.Body.Bytes(), &response)
			require.NoError(t, err)

			// 期待値の型に応じて検証
			switch expected := tt.expectedBody.(type) {
			case responses.StandardResponse:
				assert.Equal(t, expected.Message, response["message"])
			case responses.ErrorResponse:
				assert.Equal(t, expected.Error, response["error"])
			}
		})
	}
}
