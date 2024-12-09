package main

import (
	"go-rust-comparison/backend/internal/adapter/database"
	"go-rust-comparison/backend/internal/domain/models"
)

func main() {
	database.InitDB()

	if err := database.DB.AutoMigrate(&models.Item{}); err != nil {
		panic("マイグレーションに失敗しました: " + err.Error())
	}
}
