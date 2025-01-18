package handlers

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

func Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なリクエストです"})
		return
	}

	// データベースからユーザーを検索
	var operator models.Operator
	if err := db.Where("email = ?", req.Email).First(&operator).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "メールアドレスまたはパスワードが正しくありません"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "サーバーエラーが発生しました"})
		return
	}

	// パスワードの検証
	if err := bcrypt.CompareHashAndPassword([]byte(operator.PasswordHash), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "メールアドレスまたはパスワードが正しくありません"})
		return
	}

	// JWTトークンの生成
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":   operator.ID,
		"email": operator.Email,
		"role":  operator.Role,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})

	// トークンに署名
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "トークンの生成に失敗しました"})
		return
	}

	// レスポンスを返す
	c.JSON(http.StatusOK, LoginResponse{
		Token: tokenString,
	})
}
