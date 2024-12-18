package config

import (
    "time"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

// csrfの設定
func CORSConfig() gin.HandlerFunc {
    return cors.New(cors.Config{
        // TODO: 本番のurlも追加しようね
        AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "PATCH", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		// TODO: csrf導入時に, "X-CSRF-Token"を追記？
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
    })
}