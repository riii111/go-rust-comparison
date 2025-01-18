package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		// ログインエンドポイント
		api.POST("/login", handlers.Login)
	}
}
