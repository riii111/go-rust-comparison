package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

// 認証が必要なルートのセットアップ
func setupAuthRoutes(api *gin.RouterGroup, protected *gin.RouterGroup) {
	// LoginHandlerの初期化
	loginRepository := repository.NewLoginRepository()
	loginUseCase := usecase.NewLoginUseCase(loginRepository)
	loginHandler := handlers.NewLoginHandler(loginUseCase)

	// 認証不要のルート
	api.POST("/login", loginHandler.Login)

	// 認証が必要なルート
	protected.POST("/logout", handlers.Logout)
}

// ヘルスチェックルートのセットアップ
func setupHealthRoutes(api *gin.RouterGroup) {
	health := api.Group("/health")
	{
		health.GET("", handlers.HealthCheck)
	}
}

// オペレータールートのセットアップ
func setupOperatorRoutes(protected *gin.RouterGroup) {
	operators := protected.Group("/operators")
	operatorRepo := repository.NewOperatorRepository()
	operatorUsecase := usecase.NewOperatorUsecase(operatorRepo)
	operatorHandler := handlers.NewOperatorHandler(operatorUsecase)
	operators.POST("", operatorHandler.CreateOperator)
}

// メインのルーティング設定関数
func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")

	// 認証が不要なルート
	setupHealthRoutes(api)

	// 認証が必要なルート
	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware())
	{
		setupAuthRoutes(api, protected)
		setupOperatorRoutes(protected)
	}
}
