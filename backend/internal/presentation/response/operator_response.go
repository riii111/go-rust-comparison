package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
)

func SendOperatorCreatedResponse(c *gin.Context, message string, operator *models.Operator) {
	c.JSON(http.StatusCreated, gin.H{
		"message": message,
		"status":  "success",
	})
}

func SendBadRequestError(c *gin.Context, message string) {
	c.JSON(http.StatusBadRequest, gin.H{"error": message})
}

func SendConflictError(c *gin.Context, message string) {
	c.JSON(http.StatusConflict, gin.H{"error": message})
}

func SendInternalServerError(c *gin.Context, message string) {
	c.JSON(http.StatusInternalServerError, gin.H{"error": message})
}
