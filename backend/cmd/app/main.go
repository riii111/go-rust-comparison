package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"

	"log"
	"os"

	"github.com/riii111/go-rust-comparison/internal/adapter/routes"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"go.uber.org/zap"
)

func main() {
	// zapロガーの初期化
	logger, err := zap.NewProduction()
	if err != nil {
		log.Fatalf("ロガーの初期化に失敗しました: %v", err)
	}
	defer logger.Sync()

	// 環境変数DEBUGに基づいてGinモードを設定
	if os.Getenv("DEBUG") == "true" {
		gin.SetMode(gin.DebugMode)
		logger, err = zap.NewDevelopment()
		if err != nil {
			log.Fatalf("開発用ロガーの初期化に失敗しました: %v", err)
		}
		log.Println("Ginをデバッグモードで起動します")
	} else {
		gin.SetMode(gin.ReleaseMode)
		log.Println("Ginをリリースモードで起動します")
	}

	// データベース初期化
	database.InitDB()

	// Ginエンジンの初期化
	r := gin.Default()

	// カスタムバリデーションの登録
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		requests.RegisterProductValidations(v)
	}

	// CORSミドルウェアの設定
	r.Use(middleware.CORSConfig())
	r.Use(middleware.LoggingMiddleware(logger))

	// ルーティングの設定
	routes.SetupRoutes(r)

	// サーバーの起動
	if err := r.Run(":8000"); err != nil {
		log.Fatalf("サーバの起動に失敗しました: %v", err)
	}
}
