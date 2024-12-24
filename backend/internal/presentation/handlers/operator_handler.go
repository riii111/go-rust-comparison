package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
)

type OperatorHandler struct {
	validator *validator.Validate
}

func NewOperatorHandler() *OperatorHandler {
	v := validator.New()
	models.RegisterCustomValidations(v)
	return &OperatorHandler{validator: v}
}

func (h *OperatorHandler) CreateOperator(c *gin.Context) {
	var req requests.CreateOperatorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なリクエスト形式です"})
		return
	}

	if err := h.validator.Struct(req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "パスワードのハッシュ化に失敗しました"})
		return
	}

	operator := &models.Operator{
		Email:        req.Email,
		Username:     req.Username,
		PasswordHash: string(hashedPassword),
		Role:         req.Role,
		StoreID:      req.StoreID,
		CreatedBy:    req.CreatedBy,
		UpdatedBy:    req.CreatedBy, // 作成時は作成者と更新者は同じ
	}

	if req.AvatarURL != "" {
		operator.AvatarURL = req.AvatarURL
	}

	if err := database.DB.Create(operator).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "オペレーターの作成に失敗しました"})
		return
	}

	operator.PasswordHash = ""
	c.JSON(http.StatusCreated, operator)
}
