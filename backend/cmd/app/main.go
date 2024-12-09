package main

import (
	"log"
	"net/http"

	"internal/adapter/database"

	"github.com/gin-gonic/gin"
)

func main() {
	// データベースを初期化
	database.InitDB()

	// ginのインスタンスを作成
	r := gin.Default()
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "pass",
		})
	})
	if err := r.Run(":8000"); err != nil {
		log.Fatalf("サーバの起動に失敗しました: %v", err)
	}
}
