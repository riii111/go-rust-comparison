package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"

	"github.com/riii111/go-rust-comparison/internal/adapter/routes"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
)

func main() {
	// 環境変数DEBUGに基づいてGinモードを設定
	if os.Getenv("DEBUG") == "true" {
		gin.SetMode(gin.DebugMode)
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
		if err := requests.RegisterOperatorValidations(v); err != nil {
			log.Fatalf("オペレーターバリデーションの登録に失敗しました: %v", err)
		}
		requests.RegisterProductValidations(v)
	}

	// CORSミドルウェアの設定
	r.Use(middleware.CORSConfig())

	// ルーティングの設定
	routes.SetupRoutes(r)

	// サーバーの起動
	if err := r.Run(":8000"); err != nil {
		log.Fatalf("サーバの起動に失敗しました: %v", err)
	}
}
