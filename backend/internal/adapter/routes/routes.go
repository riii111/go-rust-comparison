package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

// 認証が不要なパブリックルートのセットアップ
func setupPublicRoutes(api *gin.RouterGroup) {
	// ヘルスチェックルート
	health := api.Group("/health")
	{
		health.GET("", handlers.HealthCheck)
	}

	// ログインルート
	loginRepository := repository.NewLoginRepository()
	loginUseCase := usecase.NewLoginUseCase(loginRepository)
	loginHandler := handlers.NewLoginHandler(loginUseCase)
	api.POST("/login", loginHandler.Login)
}

// 認証が必要なプライベートルートのセットアップ
func setupPrivateRoutes(protected *gin.RouterGroup) {
	// ログアウト
	protected.POST("/logout", handlers.Logout)

	// オペレーター関連
	operators := protected.Group("/operators")
	operatorRepo := repository.NewOperatorRepository()
	operatorUsecase := usecase.NewOperatorUsecase(operatorRepo)
	operatorHandler := handlers.NewOperatorHandler(operatorUsecase)
	operators.POST("", operatorHandler.CreateOperator)
}

// メインのルーティング設定関数
func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")

	// 認証が不要なパブリックルート
	setupPublicRoutes(api)

	// 認証が必要なプライベートルート
	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware())
	setupPrivateRoutes(protected)
}
