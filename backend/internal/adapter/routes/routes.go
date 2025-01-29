package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/riii111/go-rust-comparison/internal/presentation/handlers"
)

func SetupRouter(r *gin.Engine, productHandler *handlers.ProductHandler) {
    api := r.Group("/api")
    {
        api.POST("/products", productHandler.CreateProduct)
    }
}