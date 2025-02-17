package handlers

import (
	"log"
	"net/http"
	"time"

	"errors"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/presentation/consts"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
)

var (
	ErrInvalidRequest = errors.New("リクエストの形式が正しくありません")
)

// クッキーを設定する共通関数
func setAuthCookie(c *gin.Context, name, value string, maxAge time.Duration) {
	config := consts.NewCookieConfig()

	c.SetCookie(
		name,                  // Name: クッキー名
		value,                 // Value: クッキーの値
		int(maxAge.Seconds()), // MaxAge: 有効期限（秒）
		consts.CookiePath,     // Path: クッキーの有効範囲
		config.Domain,         // Domain: クッキーが有効なドメイン
		config.Secure,         // Secure: HTTPSのみ
		config.HttpOnly,       // HttpOnly: JSからのアクセス制限
	)
	c.SetSameSite(config.SameSite) // SameSite属性を別途設定
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

// ユーザーのログイン処理を行う
func (h *LoginHandler) Login(c *gin.Context) {
	var req requests.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.handleError(c, ErrInvalidRequest)
		return
	}

	tokenPair, err := h.loginUseCase.Execute(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		h.handleError(c, err)
		return
	}

	h.setAuthCookies(c, tokenPair)
	c.JSON(http.StatusOK, responses.StandardResponse{
		Message: "ログインに成功しました",
	})
}

// エラーを処理し、適切なHTTPレスポンスを返す
func (h *LoginHandler) handleError(c *gin.Context, err error) {
	var (
		status  = http.StatusInternalServerError
		message = usecase.ErrSystemError.Error()
	)

	// エラーログを出力
	log.Printf("エラーが発生しました: %v", err)

	switch {
	case errors.Is(err, ErrInvalidRequest):
		status = http.StatusBadRequest
		message = ErrInvalidRequest.Error()
	case errors.Is(err, usecase.ErrInvalidCredentials):
		status = http.StatusBadRequest
		message = usecase.ErrInvalidCredentials.Error()
	}

	c.JSON(status, responses.ErrorResponse{
		Error: message,
	})
}

// 認証トークンをクッキーに設定する
func (h *LoginHandler) setAuthCookies(c *gin.Context, tokenPair *usecase.TokenPair) {
	setAuthCookie(c, consts.AccessTokenCookie, tokenPair.AccessToken, consts.AccessTokenDuration)
	setAuthCookie(c, consts.RefreshTokenCookie, tokenPair.RefreshToken, consts.RefreshTokenDuration)
}
