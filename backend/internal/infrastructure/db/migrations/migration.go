package main

import (
	"fmt"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
)

func main() {
	database.InitDB()

	if err := database.DB.AutoMigrate(&models.Item{}, &models.Operator{}); err != nil {
		panic("マイグレーションに失敗しました: " + err.Error())
	}
	fmt.Println("マイグレーションが正常に完了しました")
}
