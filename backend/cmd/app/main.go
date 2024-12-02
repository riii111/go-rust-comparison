package main

import (
	"net/http"

	"auth-system/internal/adapter/database"

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
	r.Run(":8000")
}
