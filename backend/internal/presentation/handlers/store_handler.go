package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
)

type StoreHandler struct {
	validator *validator.Validate
}

func NewStoreHandler() *StoreHandler {
	return &StoreHandler{validator: validator.New()}
}

func (h *StoreHandler) CreateStore(c *gin.Context) {
	var req requests.CreateStoreRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なリクエスト形式です"})
		return
	}

	if err := h.validator.Struct(req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	store := &models.Store{
		Name:          req.Name,
		Address:       req.Address,
		PhoneNumber:   req.PhoneNumber,
		BusinessHours: req.BusinessHours,
		ZipCode:       req.ZipCode,
		Description:   req.Description,
		IsActive:      req.IsActive,
		CreatedBy:     req.CreatedBy,
		UpdatedBy:     req.CreatedBy, // 作成時は作成者と更新者は同じ
	}

	if err := database.DB.Create(store).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "店舗の作成に失敗しました"})
		return
	}

	c.JSON(http.StatusCreated, store)
}
