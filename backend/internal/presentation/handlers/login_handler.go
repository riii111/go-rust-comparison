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

// ログインリクエストの構造体
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// ログインレスポンスの構造体
type LoginResponse struct {
	Token string `json:"token"`
}

// アクセストークンとリフレッシュトークンのペアを保持する構造体
type TokenPair struct {
	AccessToken  string
	RefreshToken string
}

// クッキーの設定に関する定数
const (
	accessTokenDuration  = 24 * time.Hour
	refreshTokenDuration = 30 * 24 * time.Hour
	cookiePath           = "/"
)

// エラーレスポンスを返す共通関数
func sendErrorResponse(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{"error": message})
}

// クッキーを設定する共通関数
func setAuthCookie(c *gin.Context, name, value string, maxAge time.Duration) {
	c.SetCookie(
		name,                  // name: クッキーの名前
		value,                 // value: クッキーの値
		int(maxAge.Seconds()), // maxAge: クッキーの有効期限（秒単位）
		cookiePath,            // path: クッキーが有効なパス（"/"の場合、全てのパスで有効）
		os.Getenv("DOMAIN"),   // domain: クッキーが有効なドメイン
		true,                  // secure: trueの場合、HTTPSでのみクッキーを送信
		true,                  // httpOnly: trueの場合、JavaScriptからクッキーへのアクセスを禁止
	)
}

// ユーザー情報を基にJWTトークンペアを生成する関数
func generateTokenPair(user *models.Operator) (*TokenPair, error) {
	// アクセストークンの生成（24時間有効）
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":   user.ID,
		"email": user.Email,
		"role":  user.Role,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})

	// リフレッシュトークンの生成（30日間有効）
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

// ユーザー認証を行う関数
func authenticateUser(email, password string) (*models.Operator, error) {
	var operator models.Operator
	if err := database.DB.Where("email = ?", email).First(&operator).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("認証失敗")
		}
		return nil, fmt.Errorf("データベースエラー: %w", err)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(operator.PasswordHash), []byte(password)); err != nil {
		return nil, fmt.Errorf("認証失敗")
	}

	return &operator, nil
}

// ログイン処理を行うハンドラー関数
func Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		sendErrorResponse(c, http.StatusBadRequest, "無効なリクエストです")
		return
	}

	operator, err := authenticateUser(req.Email, req.Password)
	if err != nil {
		if err.Error() == "認証失敗" {
			sendErrorResponse(c, http.StatusUnauthorized, "メールアドレスまたはパスワードが正しくありません")
			return
		}
		sendErrorResponse(c, http.StatusInternalServerError, "サーバーエラーが発生しました")
		return
	}

	tokenPair, err := generateTokenPair(operator)
	if err != nil {
		sendErrorResponse(c, http.StatusInternalServerError, "トークンの生成に失敗しました")
		return
	}

	setAuthCookie(c, "access_token", tokenPair.AccessToken, accessTokenDuration)
	setAuthCookie(c, "refresh_token", tokenPair.RefreshToken, refreshTokenDuration)

	c.JSON(http.StatusOK, gin.H{"message": "ログインに成功しました"})
}
