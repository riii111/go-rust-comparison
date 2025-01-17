package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"
	"github.com/riii111/go-rust-comparison/internal/adapter/routes"
)

func main() {
	// データベース初期化
	database.InitDB()

	// Ginエンジンの初期化
	r := gin.Default()

	// CORSミドルウェアの設定
	r.Use(middleware.CORSConfig())

	// ルーティングの設定
	routes.SetupRoutes(r)

	// サーバーの起動
	if err := r.Run(":8000"); err != nil {
		log.Fatalf("サーバの起動に失敗しました: %v", err)
	}
}
