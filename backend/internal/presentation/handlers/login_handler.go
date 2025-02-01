package handlers

import (
	"net/http"
	"os"
	"time"

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
const (
	ErrInvalidRequest = "invalid_request"
	ErrAuthentication = "authentication_error"
	ErrInternalServer = "internal_server_error"
)

// エラーメッセージの定義
var errorMessages = map[string]string{
	ErrInvalidRequest: "リクエストの形式が正しくありません",
	ErrAuthentication: "メールアドレスまたはパスワードが正しくありません",
	ErrInternalServer: "サーバーエラーが発生しました",
}

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
	var req requests.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.handleError(c, ErrInvalidRequest, err)
		return
	}

	tokenPair, err := h.loginUseCase.Execute(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		switch err.(type) {
		case *usecase.AuthError:
			h.handleError(c, ErrAuthentication, err)
		default:
			h.handleError(c, ErrInternalServer, err)
		}
		return
	}

	h.setAuthCookies(c, tokenPair)
	c.JSON(http.StatusOK, responses.ApiResponse{
		Message: "ログインに成功しました",
	})
}

func (h *LoginHandler) handleError(c *gin.Context, errType string, err error) {
	status := http.StatusInternalServerError
	switch errType {
	case ErrInvalidRequest:
		status = http.StatusBadRequest
	case ErrAuthentication:
		status = http.StatusUnauthorized
	}
	sendErrorResponse(c, status, errorMessages[errType])
}

func (h *LoginHandler) setAuthCookies(c *gin.Context, tokenPair *usecase.TokenPair) {
	setAuthCookie(c, "access_token", tokenPair.AccessToken, accessTokenDuration)
	setAuthCookie(c, "refresh_token", tokenPair.RefreshToken, refreshTokenDuration)
}
