package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

func main() {
	r := gin.Default()

	database.InitDB()
	stockRep := repository.NewStockRepository(database.DB)
	stockUserCase := usecase.NewStockUseCase(stockRep)
	stockHan := handlers.NewStockHandler(stockUserCase)

	r.POST("/stock", stockHan.CreateStock)

	middleware.CORSConfig()

	// ヘルスチェックエンドポイント
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "ok",
		})
	})

	if err := r.Run(":8000"); err != nil {
		log.Fatalf("サーバの起動に失敗しました: %v", err)
	}
}
