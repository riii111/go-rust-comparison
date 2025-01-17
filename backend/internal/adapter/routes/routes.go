package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		// ヘルスチェックエンドポイント
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"status": "ok",
			})
		})

		// オペレーター関連のエンドポイント
		operators := api.Group("/operators")
		{
			operatorHandler := handlers.NewOperatorHandler()
			operators.POST("", operatorHandler.CreateOperator)
		}
	}
}
