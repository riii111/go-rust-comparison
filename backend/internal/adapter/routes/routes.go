package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

// 認証が必要なルートのセットアップ
func setupAuthRoutes(api *gin.RouterGroup) {
	auth := api.Group("")
	{
		auth.POST("/login", handlers.Login)
	}

	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/logout", handlers.Logout)
	}
}

// ヘルスチェックルートのセットアップ
func setupHealthRoutes(api *gin.RouterGroup) {
	protected := api.Group("/health")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("", handlers.HealthCheck)
	}
}

// オペレータールートのセットアップ
func setupOperatorRoutes(api *gin.RouterGroup) {
	protected := api.Group("/operators")
	protected.Use(middleware.AuthMiddleware())

	operatorRepo := repository.NewOperatorRepository()
	operatorUsecase := usecase.NewOperatorUsecase(operatorRepo)
	operatorHandler := handlers.NewOperatorHandler(operatorUsecase)
	protected.POST("", operatorHandler.CreateOperator)
}

// メインのルーティング設定関数
func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		setupAuthRoutes(api)
		setupHealthRoutes(api)
		setupOperatorRoutes(api)
	}
}
