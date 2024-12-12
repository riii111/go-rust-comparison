package main

import (
    "log"
    "net/http"

    "github.com/gin-contrib/sessions"
    "github.com/gin-contrib/sessions/cookie"
    "github.com/gin-gonic/gin"
    "github.com/utrack/gin-csrf"
)

func main() {
    r := gin.Default()

	// セッションミドルウェアの設定
    store := cookie.NewStore([]byte("secret"))
    r.Use(sessions.Sessions("mysession", store))

	// CSRF設定をミドルウェアとして追加
    r.Use(csrf.Middleware(csrf.Options{
		// TODO: 一旦ハードコードしてるのでenvから呼び出す形にする
        Secret: "secret123", 
        ErrorFunc: func(c *gin.Context) {
            c.String(http.StatusForbidden, "CSRF token mismatch")
            c.Abort()
        },
    }))
    
	// ヘルスチェックエンドポイント
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "pass",
			"csrf_token": csrf.GetToken(c),
		})
	})

	// CSRFトークンを必要とするエンドポイント
	r.POST("/api/submit", func(c *gin.Context) {
		// CSRFトークンを検証
		c.String(http.StatusOK, "Form submitted successfully")
	})

    if err := r.Run(":8000"); err != nil {
        log.Fatalf("サーバの起動に失敗しました: %v", err)
    }
}
