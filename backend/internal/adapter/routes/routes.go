package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

// システム管理者専用ルートのセットアップ
func setupAdminRoutes(privateRoutes *gin.RouterGroup) *gin.RouterGroup {
	adminRoutes := privateRoutes.Group("")
	adminRoutes.Use(middleware.SystemAdminOnly())
	return adminRoutes
}

func setupHealthRoutes(publicRoutes *gin.RouterGroup) {
	health := publicRoutes.Group("/health")
	{
		health.GET("", handlers.HealthCheck)
	}
}

func setupLoginRoutes(publicRoutes *gin.RouterGroup) {
	login := publicRoutes.Group("/login")
	loginRepo := repository.NewLoginRepository(database.DB)
	loginUseCase := usecase.NewLoginUseCase(loginRepo)
	loginHandler := handlers.NewLoginHandler(loginUseCase)
	login.POST("", loginHandler.Login)
}

func setupOperatorRoutes(privateRoutes *gin.RouterGroup) {
	operators := setupAdminRoutes(privateRoutes).Group("/operators")
	operatorRepo := repository.NewOperatorRepository(database.DB)
	operatorUsecase := usecase.NewOperatorUsecase(operatorRepo)
	operatorHandler := handlers.NewOperatorHandler(operatorUsecase)
	operators.POST("", operatorHandler.CreateOperator)
}

func setupStockRoutes(api *gin.RouterGroup) {
	stocks := api.Group("/stocks")
	stockRepo := repository.NewStockRepository(database.DB)
	stockUseCase := usecase.NewStockUseCase(stockRepo)
	stockHan := handlers.NewStockHandler(stockUseCase)
	stocks.POST("", stockHan.CreateStock)
}

func setupProductRoutes(api *gin.RouterGroup) {
	products := api.Group("/products")
	productRepo := repository.NewProductRepository(database.DB)
	productUsecase := usecase.NewProductUsecase(productRepo)
	productHandler := handlers.NewProductHandler(productUsecase)
	products.POST("", productHandler.CreateProduct)
}

// 認証が必要なプライベートルートのセットアップ
func setupLogoutRoutes(privateRoutes *gin.RouterGroup) {
	// ログアウト
	privateRoutes.POST("/logout", handlers.Logout)
}

// メインのルーティング設定関数
func SetupRoutes(r *gin.Engine) {
	const apiBase = "/api"
	publicRoutes := r.Group(apiBase)
	privateRoutes := r.Group(apiBase)

	// 認証が不要なパブリックルート
	setupPublicRoutes(publicRoutes)

	// 認証が必要なプライベートルート
	privateRoutes.Use(middleware.AuthMiddleware())
	setupPrivateRoutes(privateRoutes)
}

// パブリックルートの設定を集約
func setupPublicRoutes(publicRoutes *gin.RouterGroup) {
	setupHealthRoutes(publicRoutes)
	setupLoginRoutes(publicRoutes)
}

// プライベートルートの設定を集約
func setupPrivateRoutes(privateRoutes *gin.RouterGroup) {
	setupLogoutRoutes(privateRoutes)
	setupOperatorRoutes(privateRoutes)
	setupStockRoutes(privateRoutes)
	setupProductRoutes(privateRoutes)
}
