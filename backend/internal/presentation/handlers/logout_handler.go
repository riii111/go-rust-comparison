package handlers

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
)

// クッキー名の定数定義
const (
	AccessTokenCookie  = "access_token"
	RefreshTokenCookie = "refresh_token"
)

func removeCookie(c *gin.Context, cookieName string) error {

	c.SetCookie(
		cookieName,          // name: クッキーの名前
		"",                  // value: クッキーの値（空文字で削除）
		-1,                  // maxAge: クッキーの有効期限（-1で即時削除）
		"/",                 // path: クッキーが有効なパス（"/"でサイト全体）
		os.Getenv("DOMAIN"), // domain: クッキーが有効なドメイン
		true,                // secure: HTTPSでのみ送信可能
		true,                // httpOnly: JavaScriptからアクセス不可
	)
	return nil
}

func Logout(c *gin.Context) {
	// 両方のトークンを削除
	for _, cookieName := range []string{AccessTokenCookie, RefreshTokenCookie} {
		if err := removeCookie(c, cookieName); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "ログアウト処理に失敗しました"})
			return
		}
	}

	c.JSON(http.StatusOK, responses.ApiResponse{
		Message: "ログアウトしました",
	})
}
