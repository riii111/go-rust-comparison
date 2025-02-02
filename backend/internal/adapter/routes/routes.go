package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

// 認証が不要なパブリックルートのセットアップ
func setupPublicRoutes(publicRoutes *gin.RouterGroup) {
	// ヘルスチェックルート
	health := publicRoutes.Group("/health")
	{
		health.GET("", handlers.HealthCheck)
	}

	// ログインルート
	loginRepo := repository.NewLoginRepository()
	loginUseCase := usecase.NewLoginUseCase(loginRepo)
	loginHandler := handlers.NewLoginHandler(loginUseCase)
	publicRoutes.POST("/login", loginHandler.Login)
}

// 認証が必要なプライベートルートのセットアップ
func setupPrivateRoutes(privateRoutes *gin.RouterGroup) {
	// ログアウト
	privateRoutes.POST("/logout", handlers.Logout)

	// オペレーター関連
	operators := privateRoutes.Group("/operators")
	operatorRepo := repository.NewOperatorRepository()
	operatorUsecase := usecase.NewOperatorUsecase(operatorRepo)
	operatorHandler := handlers.NewOperatorHandler(operatorUsecase)
	operators.POST("", operatorHandler.CreateOperator)
}

// メインのルーティング設定関数
func SetupRoutes(r *gin.Engine) {
	publicRoutes := r.Group("/api")

	// 認証が不要なパブリックルート
	setupPublicRoutes(publicRoutes)

	// 認証が必要なプライベートルート
	privateRoutes := publicRoutes.Group("")
	privateRoutes.Use(middleware.AuthMiddleware())
	setupPrivateRoutes(privateRoutes)
}
