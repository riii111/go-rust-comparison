package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"
	"github.com/riii111/go-rust-comparison/internal/adapter/routes"
)

func main() {
	r := gin.Default()

	middleware.CORSConfig()

	// ルーティングの設定
	routes.SetupRoutes(r)

	if err := r.Run(":8000"); err != nil {
		log.Fatalf("サーバの起動に失敗しました: %v", err)
	}
}
