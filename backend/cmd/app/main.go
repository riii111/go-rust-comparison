package main

import (
    "log"
    "net/http"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

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
	
    
    // ヘルスチェックエンドポイント
    r.GET("/api/health", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "msg": "pass",
        })
    })


    if err := r.Run(":8000"); err != nil {
        log.Fatalf("サーバの起動に失敗しました: %v", err)
    }
}
