package handlers

import (
	"log"
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
)

// クッキーを設定する共通関数
// name: クッキーの名前（access_token または refresh_token）
// value: クッキーの値（JWTトークン）
// maxAge: クッキーの有効期限（アクセストークンは24時間、リフレッシュトークンは30日）
func setAuthCookie(c *gin.Context, name, value string, maxAge time.Duration) {
	c.SetCookie(
		name,                  // クッキー名
		value,                 // クッキーの値
		int(maxAge.Seconds()), // 有効期限（秒）
		cookiePath,            // パス（"/"）
		os.Getenv("DOMAIN"),   // ドメイン
		true,                  // セキュアクッキー（HTTPS接続のみ）
		true,                  // HTTPOnly（JavaScriptからアクセス不可）
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
		h.handleError(c, err)
		return
	}

	h.setAuthCookies(c, tokenPair)
	c.JSON(http.StatusOK, responses.ApiResponse{
		Message: "ログインに成功しました",
	})
}

func (h *LoginHandler) handleError(c *gin.Context, err error) {
	var (
		status  = http.StatusInternalServerError
		message = usecase.ErrSystemError.Error()
	)

	// エラーログを出力
	log.Printf("エラーが発生しました: %v", err)

	switch {
	case errors.Is(err, usecase.ErrInvalidCredentials):
		status = http.StatusUnauthorized
		message = usecase.ErrInvalidCredentials.Error()
	case errors.Is(err, ErrInvalidRequest):
		status = http.StatusBadRequest
		message = ErrInvalidRequest.Error()
	}

	c.JSON(status, responses.ErrorResponse{
		Error: message,
	})
}

func (h *LoginHandler) setAuthCookies(c *gin.Context, tokenPair *usecase.TokenPair) {
	setAuthCookie(c, "access_token", tokenPair.AccessToken, accessTokenDuration)
	setAuthCookie(c, "refresh_token", tokenPair.RefreshToken, refreshTokenDuration)
}
