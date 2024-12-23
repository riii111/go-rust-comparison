package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

func SetupRoutes(r *gin.Engine) {
	operatorHandler := handlers.NewOperatorHandler()

	api := r.Group("/api")
	{
		operators := api.Group("/operators")
		{
			operators.POST("", operatorHandler.CreateOperator)
		}
	}
}
