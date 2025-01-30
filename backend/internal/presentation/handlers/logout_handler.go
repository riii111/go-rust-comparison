package handlers

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func removeCookie(c *gin.Context, cookieName string) {
	c.SetCookie(
		cookieName,          // name: クッキーの名前
		"",                  // value: クッキーの値（空文字で削除）
		-1,                  // maxAge: クッキーの有効期限（-1で即時削除）
		"/",                 // path: クッキーが有効なパス（"/"でサイト全体）
		os.Getenv("DOMAIN"), // domain: クッキーが有効なドメイン
		true,                // secure: HTTPSでのみ送信可能
		true,                // httpOnly: JavaScriptからアクセス不可
	)
}

func Logout(c *gin.Context) {
	// 各トークンのCookieを削除
	removeCookie(c, "access_token")
	removeCookie(c, "refresh_token")

	c.JSON(http.StatusOK, gin.H{
		"message": "ログアウトしました",
	})
}
