package handlers

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

type TokenPair struct {
	AccessToken  string
	RefreshToken string
}

func generateTokenPair(user *models.Operator) (*TokenPair, error) {
	// アクセストークンの生成
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":   user.ID,
		"email": user.Email,
		"role":  user.Role,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})

	// リフレッシュトークンの生成
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// アクセストークンの署名
	accessTokenString, err := accessToken.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
	if err != nil {
		return nil, fmt.Errorf("アクセストークンの署名に失敗しました: %w", err)
	}

	// リフレッシュトークンの署名
	refreshTokenString, err := refreshToken.SignedString([]byte(os.Getenv("JWT_REFRESH_SECRET_KEY")))
	if err != nil {
		return nil, fmt.Errorf("リフレッシュトークンの署名に失敗しました: %w", err)
	}

	return &TokenPair{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}, nil
}

func Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なリクエストです"})
		return
	}

	// データベースからユーザーを検索
	var operator models.Operator
	if err := database.DB.Where("email = ?", req.Email).First(&operator).Error; err != nil {
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
	tokenPair, err := generateTokenPair(&operator)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "トークンの生成に失敗しました"})
		return
	}

	// HTTPOnly Cookieとしてトークンを設定
	c.SetCookie(
		"access_token",        // クッキー名
		tokenPair.AccessToken, // 値
		3600*24,               // 有効期限（秒）
		"/",                   // パス
		os.Getenv("DOMAIN"),   // ドメイン
		true,                  // セキュア（HTTPS only）
		true,                  // HTTPOnly
	)

	// リフレッシュトークンの設定
	c.SetCookie(
		"refresh_token",
		tokenPair.RefreshToken,
		3600*24*30, // 30日
		"/",
		os.Getenv("DOMAIN"),
		true,
		true,
	)

	// トークンを含まないレスポンスを返す
	c.JSON(http.StatusOK, gin.H{
		"message": "ログインに成功しました",
	})
}
