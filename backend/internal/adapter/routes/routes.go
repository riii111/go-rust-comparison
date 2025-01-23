package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

// ルートグループごとのセットアップ関数を定義
func setupHealthRoutes(api *gin.RouterGroup) {
	api.GET("/health", handlers.HealthCheck)
}

func setupOperatorRoutes(api *gin.RouterGroup) {
	operators := api.Group("/operators")
	operatorUsecase := usecase.NewOperatorUsecase()
	operatorHandler := handlers.NewOperatorHandler(operatorUsecase)
	operators.POST("", operatorHandler.CreateOperator)
}

// メインのルーティング設定関数
func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		setupHealthRoutes(api)
		setupOperatorRoutes(api)
	}
}
