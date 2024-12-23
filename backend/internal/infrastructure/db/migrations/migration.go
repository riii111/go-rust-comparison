package main

import (
	"fmt"
	"log"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
)

func performMigration() error {
	if err := database.DB.AutoMigrate(&models.Operator{}, &models.Store{}, &models.Stock{}); err != nil {
		return fmt.Errorf("マイグレーションに失敗しました: %w", err)
	}
	return nil
}

func main() {
	database.InitDB()

	if err := performMigration(); err != nil {
		log.Fatal(err)
	}

	fmt.Println("マイグレーションが正常に完了しました")
}
