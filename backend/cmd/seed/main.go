package main

import (
	"log"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models/seed"
)

func main() {
	// データベース接続
	database.InitDB()

	// シードデータの作成
	stores := seed.CreateStoreSeedData()

	for _, store := range stores {
		if err := database.DB.Create(&store).Error; err != nil {
			log.Printf("店舗データの作成に失敗しました: %v", err)
			continue
		}
	}

	log.Printf("店舗のシードデータを %d 件作成しました", len(stores))
}
