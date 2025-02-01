package handlers

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
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
		name,
		value,
		int(maxAge.Seconds()),
		cookiePath,
		os.Getenv("DOMAIN"),
		true,
		true,
	)
}

// LoginHandlerの構造体を追加
type LoginHandler struct {
	loginUseCase usecase.LoginUseCase
}

// NewLoginHandlerコンストラクタを追加
func NewLoginHandler(loginUseCase usecase.LoginUseCase) *LoginHandler {
	return &LoginHandler{
		loginUseCase: loginUseCase,
	}
}

// Loginメソッドを構造体のメソッドとして定義
func (h *LoginHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		sendErrorResponse(c, http.StatusBadRequest, "リクエストの形式が正しくありません")
		return
	}

	tokenPair, err := h.loginUseCase.Execute(req.Email, req.Password)
	if err != nil {
		if _, ok := err.(*usecase.AuthError); ok {
			sendErrorResponse(c, http.StatusUnauthorized, "メールアドレスまたはパスワードが正しくありません")
			return
		}
		sendErrorResponse(c, http.StatusInternalServerError, "サーバーエラーが発生しました")
		return
	}

	setAuthCookie(c, "access_token", tokenPair.AccessToken, accessTokenDuration)
	setAuthCookie(c, "refresh_token", tokenPair.RefreshToken, refreshTokenDuration)

	c.JSON(http.StatusOK, gin.H{"message": "ログインに成功しました"})
}
