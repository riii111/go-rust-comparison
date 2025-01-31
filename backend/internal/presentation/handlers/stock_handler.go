package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
)

type StockHandler struct {
	stockUserCase usecase.StockUserCase
}

func NewStockHandler(stockUserCase usecase.StockUserCase) *StockHandler {
	return &StockHandler{stockUserCase: stockUserCase}
}

func (s *StockHandler) CreateStock(c *gin.Context) {
	var requestBody requests.CreateStockInput
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	stock := models.Stock{
		ProductID:   requestBody.ProductID,
		StoreID:     requestBody.StoreID,
		Size:        requestBody.Size,
		Color:       requestBody.Color,
		Quantity:    requestBody.Quantity,
		Price:       requestBody.Price,
		IsAvailable: requestBody.IsAvailable,
	}

	createdStock, err := s.stockUserCase.Create(&stock)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, createdStock)
}
