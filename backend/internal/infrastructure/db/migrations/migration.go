package main

import (
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
)

func main() {
	database.InitDB()

	if err := database.DB.AutoMigrate(&models.Item{}); err != nil {
		panic("マイグレーションに失敗しました: " + err.Error())
	}
}
