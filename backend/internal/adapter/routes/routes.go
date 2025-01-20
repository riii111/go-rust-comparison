package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

func SetupRoutes(r *gin.Engine) {
	operatorHandler := handlers.NewOperatorHandler()

	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"status": "オッケあああー",
			})
		})

		operators := api.Group("/operators")
		{
			operators.POST("", operatorHandler.CreateOperator)
		}
	}
}
