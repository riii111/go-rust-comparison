package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/presentation/consts"
)

func Logout(c *gin.Context) {
	// アクセストークンの存在確認
	_, err := c.Cookie(consts.AccessTokenCookie)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ログアウト処理に失敗しました"})
		return
	}

	// 両方のトークンを削除
	removeCookie(c, consts.AccessTokenCookie)
	removeCookie(c, consts.RefreshTokenCookie)

	c.Status(http.StatusNoContent)
}

func removeCookie(c *gin.Context, name string) {
	config := consts.NewCookieConfig()

	c.SetCookie(
		name,              // Name: クッキー名
		"",                // Value: 空文字列
		-1,                // MaxAge: 即時削除
		consts.CookiePath, // Path: クッキーの有効範囲
		config.Domain,     // Domain: クッキーが有効なドメイン
		config.Secure,     // Secure: HTTPSのみ
		config.HttpOnly,   // HttpOnly: JSからのアクセス制限
	)
}
