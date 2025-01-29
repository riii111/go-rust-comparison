package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/riii111/go-rust-comparison/internal/adapter/database"
    "github.com/riii111/go-rust-comparison/internal/adapter/middleware"
    "github.com/riii111/go-rust-comparison/internal/adapter/routes"
    "github.com/riii111/go-rust-comparison/internal/presentation/handlers"
    "github.com/riii111/go-rust-comparison/internal/infrastructure/storage"
)

func main() {
    // データベース初期化
    database.InitDB()

    // MinIOストレージの初期化
    minioStorage, err := storage.NewMinioStorage()
    if err != nil {
        log.Fatalf("Failed to initialize storage: %v", err)
    }

    r := gin.Default()
    middleware.CORSConfig()

	// ヘルスチェックエンドポイント
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "ok",
		})
	})
    
    // ProductHandlerの初期化
    productHandler := handlers.NewProductHandler(database.DB, minioStorage)
    routes.SetupRouter(r, productHandler)

	if err := r.Run(":8000"); err != nil {
		log.Fatalf("サーバの起動に失敗しました: %v", err)
	}
}
