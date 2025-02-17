package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
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
	var requestBody requests.CreateStockRequest
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "入力内容に誤りがあります"})
		return
	}
	createdStock, err := s.stockUserCase.Create(&requestBody)
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

func (s *StockHandler) GetStock(c *gin.Context) {
	var requestURL requests.GetStockRequest
	if err := c.ShouldBindUri(&requestURL); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "IDを確認してください"})
		return
	}

	getStock, err := s.stockUserCase.Get(requestURL.ID)
	if err != nil {
		switch {
		case errors.Is(err, repository.ErrNotFound):
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "システムエラーが発生しました。しばらく時間をおいて再度お試しください"})
		}
		return
	}

	c.JSON(http.StatusOK, getStock)
}

func (s *StockHandler) DeleteStock(c *gin.Context) {
	var requestURL requests.GetStockRequest
	if err := c.ShouldBindUri(&requestURL); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "IDを確認してください"})
		return
	}

	err := s.stockUserCase.Delete(requestURL.ID)
	if err != nil {
		switch {
		case errors.Is(err, repository.ErrNotFound):
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "システムエラーが発生しました。しばらく時間をおいて再度お試しください"})
		}
		return
	}

	c.JSON(http.StatusNoContent, gin.H{"msg": "正常に削除されました"})
}
