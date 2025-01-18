package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/middleware"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

func SetupRoutes(r *gin.Engine) {
	// CORSミドルウェアを適用
	r.Use(middleware.CORSConfig())

	// ベースパスを /api に設定
	api := r.Group("/api")
	{
		// 認証不要のエンドポイント
		api.POST("/login", handlers.Login)

		// 認証が必要なエンドポイント
		protected := api.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			protected.POST("/logout", handlers.Logout)
			protected.GET("/health", handlers.HealthCheck)
			// その他の保護されたエンドポイント...
		}
	}
}
