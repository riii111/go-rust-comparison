package handlers

import (
	"net/http"
	"os"
	"time"

	"errors"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
)

// クッキーの設定に関する定数
const (
	accessTokenDuration  = 24 * time.Hour
	refreshTokenDuration = 30 * 24 * time.Hour
	cookiePath           = "/"
)

// エラー種別の定義
var (
	ErrInvalidRequest = errors.New("リクエストの形式が正しくありません")
	ErrAuthentication = errors.New("メールアドレスまたはパスワードが正しくありません")
	ErrInternalServer = errors.New("サーバーエラーが発生しました")
)

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
	var req requests.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.handleError(c, ErrInvalidRequest)
		return
	}

	tokenPair, err := h.loginUseCase.Execute(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		switch err.(type) {
		case *usecase.AuthError:
			h.handleError(c, ErrAuthentication)
		default:
			h.handleError(c, ErrInternalServer)
		}
		return
	}

	h.setAuthCookies(c, tokenPair)
	c.JSON(http.StatusOK, responses.ApiResponse{
		Message: "ログインに成功しました",
	})
}

func (h *LoginHandler) handleError(c *gin.Context, err error) {
	// デフォルト値を設定
	status := http.StatusInternalServerError
	message := ErrInternalServer.Error()
	switch err {
	case ErrInvalidRequest:
		status = http.StatusBadRequest
		message = err.Error()
	case ErrAuthentication:
		status = http.StatusUnauthorized
		message = err.Error()
	case ErrInternalServer:
	}

	c.JSON(status, responses.ErrorResponse{
		Error: message,
	})
}

func (h *LoginHandler) setAuthCookies(c *gin.Context, tokenPair *usecase.TokenPair) {
	setAuthCookie(c, "access_token", tokenPair.AccessToken, accessTokenDuration)
	setAuthCookie(c, "refresh_token", tokenPair.RefreshToken, refreshTokenDuration)
}
