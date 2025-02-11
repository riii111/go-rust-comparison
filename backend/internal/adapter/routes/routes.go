package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

// ルートグループごとのセットアップ関数を定義
func setupHealthRoutes(api *gin.RouterGroup) {
	api.GET("/health", handlers.HealthCheck)
}

func setupOperatorRoutes(api *gin.RouterGroup) {
	operators := api.Group("/operators")
	operatorRepo := repository.NewOperatorRepository()
	operatorUsecase := usecase.NewOperatorUsecase(operatorRepo)
	operatorHandler := handlers.NewOperatorHandler(operatorUsecase)
	operators.POST("", operatorHandler.CreateOperator)
}

func setupProductRoutes(api *gin.RouterGroup) {
	products := api.Group("/products")
	productRepo := repository.NewProductRepository()
	productUsecase := usecase.NewProductUsecase(productRepo)
	productHandler := handlers.NewProductHandler(productUsecase)
	products.POST("", productHandler.CreateProduct)
}

// メインのルーティング設定関数
func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		setupHealthRoutes(api)
		setupOperatorRoutes(api)
		setupProductRoutes(api)
	}
}
