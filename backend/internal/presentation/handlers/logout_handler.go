package handlers

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func Logout(c *gin.Context) {
	// アクセストークンのCookieを削除
	c.SetCookie(
		"access_token",      // クッキー名
		"",                  // 空の値を設定
		-1,                  // 有効期限を過去に設定して即時削除
		"/",                 // パス
		os.Getenv("DOMAIN"), // ドメイン
		true,                // セキュア（HTTPS only）
		true,                // HTTPOnly
	)

	// リフレッシュトークンのCookieも削除
	c.SetCookie(
		"refresh_token",
		"",
		-1,
		"/",
		os.Getenv("DOMAIN"),
		true,
		true,
	)

	c.JSON(http.StatusOK, gin.H{
		"message": "ログアウトしました",
	})
}
