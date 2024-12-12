package main

import (
    "log"
    "net/http"
    "time"

    "github.com/gin-contrib/cors"
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

	// corsの設定
    // TODO: 別の場所で設定する？
	r.Use(cors.New(cors.Config{
		// TODO: 本番のurlも追加しようね
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "PATCH", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length", "X-CSRF-Token"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

	// CSRF設定をミドルウェアとして追加
    r.Use(csrf.Middleware(csrf.Options{
        Secret: "secret123", // 適切なシークレットキーを設定
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
