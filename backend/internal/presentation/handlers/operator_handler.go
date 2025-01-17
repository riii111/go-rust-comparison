package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"golang.org/x/crypto/bcrypt"
)

type OperatorHandler struct{}

func NewOperatorHandler() *OperatorHandler {
	return &OperatorHandler{}
}

type CreateOperatorRequest struct {
	Email     string `json:"email" binding:"required,email"`
	Username  string `json:"username" binding:"required"`
	Password  string `json:"password" binding:"required,min=8"`
	Role      string `json:"role" binding:"required,oneof=system_admin store_admin"`
	StoreID   string `json:"store_id" binding:"required,uuid"`
	AvatarURL string `json:"avatar_url" binding:"omitempty,url"`
	CreatedBy string `json:"created_by" binding:"required,uuid"`
	UpdatedBy string `json:"updated_by" binding:"omitempty,uuid"`
}

func (h *OperatorHandler) CreateOperator(c *gin.Context) {
	var req CreateOperatorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "入力内容に誤りがあります。確認して再度お試しください",
			"details": err.Error(),
		})
		return
	}

	// UpdatedByが設定されていない場合、CreatedByの値を使用
	if req.UpdatedBy == "" {
		req.UpdatedBy = req.CreatedBy
	}

	// パスワードのハッシュ化
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": "パスワードの処理に失敗しました。パスワードの要件を確認してください",
		})
		return
	}

	operator := &models.Operator{
		Email:        req.Email,
		Username:     req.Username,
		PasswordHash: string(hashedPassword),
		Role:         req.Role,
		StoreID:      req.StoreID,
		AvatarURL:    req.AvatarURL,
		CreatedBy:    req.CreatedBy,
		UpdatedBy:    req.CreatedBy,
	}

	if err := database.DB.Create(operator).Error; err != nil {
		// データベースのユニーク制約違反の場合
		if strings.Contains(err.Error(), "duplicate key") {
			c.JSON(http.StatusConflict, gin.H{
				"error": "このメールアドレスは既に登録されています。",
			})
			return
		}
		// その他のデータベースエラー
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": "オペレーターの登録に失敗しました。入力内容を確認してください",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "オペレーターの登録に成功しました",
	})
}
