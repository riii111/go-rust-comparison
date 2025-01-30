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

// ログイン処理を行うハンドラー関数
func Login(c *gin.Context) {
	// リクエストのバリデーション
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なリクエストです"})
		return
	}

	// メールアドレスを使用してユーザーを検索
	var operator models.Operator
	if err := database.DB.Where("email = ?", req.Email).First(&operator).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "メールアドレスまたはパスワードが正しくありません"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "サーバーエラーが発生しました"})
		return
	}

	// パスワードのハッシュを比較して認証
	if err := bcrypt.CompareHashAndPassword([]byte(operator.PasswordHash), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "メールアドレスまたはパスワードが正しくありません"})
		return
	}

	// JWTトークンペアを生成
	tokenPair, err := generateTokenPair(&operator)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "トークンの生成に失敗しました"})
		return
	}

	// アクセストークンをHTTPOnlyクッキーとして設定
	c.SetCookie(
		"access_token",        // name: クッキーの名前
		tokenPair.AccessToken, // value: クッキーの値
		3600*24,               // maxAge: 有効期限（秒）: 24時間
		"/",                   // path: パス: すべてのパスで利用可能
		os.Getenv("DOMAIN"),   // domain: ドメイン: 環境変数から取得
		true,                  // secure: HTTPSでのみ送信可能
		true,                  // httpOnly: JavaScriptからアクセス不可
	)

	// リフレッシュトークンをHTTPOnlyクッキーとして設定
	c.SetCookie(
		"refresh_token",        // name: クッキーの名前
		tokenPair.RefreshToken, // value: 	クッキーの値
		3600*24*30,             // maxAge: 有効期限（秒）: 30日間
		"/",                    // path: パス: すべてのパスで利用可能
		os.Getenv("DOMAIN"),    // domain: ドメイン: 環境変数から取得
		true,                   // secure: HTTPSでのみ送信可能
		true,                   // httpOnly: JavaScriptからアクセス不可
	)

	// 成功レスポンスを返す
	c.JSON(http.StatusOK, gin.H{
		"message": "ログインに成功しました",
	})
}
