package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "入力内容に誤りがあります"})
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
		switch {
		case errors.Is(err, repository.ErrForeignKey):
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "システムエラーが発生しました。しばらく時間をおいて再度お試しください"})
		}

		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": createdStock.ID})
}
